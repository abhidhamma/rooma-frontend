import {
  payStatusMap,
  reservationStatusColorMap,
  reservationStatusMap,
} from '@constant/constantVariable'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { dimmdLayerAtom } from '@state/common/common'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { isDisplayReadReservationAtom } from '@state/reservation'
import {
  readReservationListAtom,
  readReservationListSelector,
} from '@state/reservationManagement/reservationManagement'
import { readReservationParameterAtom } from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyMMddWithDot, stringToDate } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { formatMoney, getKeyFromValue } from '@util/common/others'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export default function ReadReservationList({ watch }) {
  const readReservationListCallback = useApiCallback('readReservationList')
  const [readReservationList, setReadReservationList] = useRecoilState(readReservationListAtom)
  const { list, totalCount } = readReservationList
  const setTotalCount = useSetRecoilState(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  //상세보기 팝업
  const setReadReservationParameter = useSetRecoilState(readReservationParameterAtom)
  const setIsDisplayReadReservation = useSetRecoilState(isDisplayReadReservationAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const user = loadItem('user')
  console.log(user?.cpNo)
  const cpNo = user?.cpNo === 1 || user?.cpNo === '1' ? '0' : user?.cpNo
  console.log(cpNo)

  const readReservationListParameter = {
    startDate: watch('startDate'),
    endDate: watch('endDate'),
    rmNo: 0,
    rtNo: 0,
    cpNo: 0,
    acNo: watch('acNo'),
    periodType: watch('periodType'),
    searchType: watch('searchType'),
    searchText: watch('searchText'),
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
    reserveStatus: watch('reserveStatus'),
    payStatus: watch('payStatus'),
  }

  console.log('ReadReservationList')
  console.log(list, totalCount)
  useEffect(() => {
    setTotalCount(totalCount)
    readReservationListCallback(
      readReservationListSelector(getFormDataFromJson(readReservationListParameter))
    ).then((result) => {
      const { message } = result

      if (message === '성공') {
        const {
          data: { list, totalCount },
        } = result
        setReadReservationList({ list, totalCount })
      }
    })
  }, [currentIndex, totalCount])

  useEffect(() => {
    readReservationListCallback(
      readReservationListSelector(getFormDataFromJson(readReservationListParameter))
    ).then((result) => {
      const { message } = result

      if (message === '성공') {
        const {
          data: { list, totalCount },
        } = result
        setReadReservationList({ list, totalCount })
      }
    })
  }, [])

  const showReadReservationPopup = ({ rrNo, rmNo }) => {
    setReadReservationParameter({ rrNo, rmNo })
    setIsDisplayReadReservation(true)
    setIsShowDimmdLayer(true)
  }

  return (
    <>
      {list.map(
        ({
          rrNo,
          reserveNum,
          reserveStatus,
          payStatus,
          acName,
          rtName,
          rmName,
          agentName,
          userName,
          userPhone,
          checkinDate,
          checkoutDate,
          roomSalePrice,
          regDate,
          rmNo,
        }) => (
          <tr key={rrNo}>
            <td>{reserveNum}</td>
            <td>
              <span
                className='state s1'
                style={{ background: reservationStatusColorMap[reserveStatus] }}
              >
                {getKeyFromValue(reservationStatusMap, reserveStatus)}
              </span>
            </td>
            <td>
              <span className='state s1'>{getKeyFromValue(payStatusMap, payStatus)}</span>
            </td>
            <td>{acName}</td>
            <td>{rtName}</td>
            <td>{rmName === null ? '객실명' : rmName}</td>
            <td>{agentName}</td>
            <td>{userName}</td>
            <td>{userPhone}</td>

            <td>{formatyyMMddWithDot(stringToDate(checkinDate))}</td>
            <td>{formatyyMMddWithDot(stringToDate(checkoutDate))}</td>
            <td>{`${formatMoney(roomSalePrice)}원`}</td>
            <td>{formatyyMMddWithDot(stringToDate(regDate))}</td>
            <td>
              <button
                type='button'
                className='modify'
                onClick={() => showReadReservationPopup({ rrNo, rmNo })}
              >
                상세보기
              </button>
            </td>
          </tr>
        )
      )}
    </>
  )
}
