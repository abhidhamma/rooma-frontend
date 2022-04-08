import {
  payStatusMap,
  reservationStatusColorMap,
  reservationStatusMap,
} from '@constant/constantVariable'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import {
  readReservationListAtom,
  readReservationListSelector,
} from '@state/reservationManagement/reservationManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyMMddWithDot, stringToDate } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { formatMoney, getKeyFromValue } from '@util/common/others'
import { useEffect } from 'react'
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

export default function ReadReservationList({ watch }) {
  const readReservationListCallback = useApiCallback('readReservationList')
  const [readReservationList, setReadReservationList] = useRecoilState(readReservationListAtom)
  const { list, totalCount } = readReservationList
  const setTotalCount = useSetRecoilState(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)

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
  }

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
  return (
    <>
      {list.map(
        ({
          rrNo,
          acName,
          payStatus,
          reserveStatus,
          rtName,
          roomSalePrice,
          checkinDate,
          checkoutDate,
          regDate,
        }) => (
          <tr key={rrNo}>
            <td>{rrNo}</td>
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
            <td>홍길동</td>
            <td>{rtName}</td>
            <td>온돌101호</td>
            <td>{formatyyMMddWithDot(stringToDate(checkinDate))}</td>
            <td>{formatyyMMddWithDot(stringToDate(checkoutDate))}</td>
            <td>{`${formatMoney(roomSalePrice)}원`}</td>
            <td>{formatyyMMddWithDot(stringToDate(regDate))}</td>
          </tr>
        )
      )}
    </>
  )
}
