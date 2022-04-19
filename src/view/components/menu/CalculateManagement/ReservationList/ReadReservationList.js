import { reservationStatusColorMap, reservationStatusMap } from '@constant/constantVariable'
import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  amountAtom,
  readCalculateReservationListSelector,
} from '@state/calculateManagement/reservationList'
import { readReservationListAtom } from '@state/reservationManagement/reservationManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { betweenyyyyMMdd, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { formatMoney, getKeyFromValue } from '@util/common/others'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function ReadReservationList({ watch }) {
  const readReservationListCallback = useApiCallback('readReservationList')
  const [readReservationList, setReadReservationList] = useRecoilState(readReservationListAtom)
  const setAmount = useSetRecoilState(amountAtom)
  const { list } = readReservationList

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
  }

  useEffect(() => {
    readReservationListCallback(
      readCalculateReservationListSelector(getFormDataFromJson(readReservationListParameter))
    ).then((result) => {
      const { message } = result

      if (message === '성공') {
        const {
          data: { list },
        } = result
        setReadReservationList({ list })
        setAmount(calculateAmount(list))
      }
    })
  }, [])
  return (
    <>
      {list.map(
        ({
          rrNo,
          reserveNum,
          regDate,
          agentName,
          userName,
          userPhone,
          checkinDate,
          checkoutDate,
          acName,
          rtName,
          rmName,
          roomSalePrice,
          addPersionPrice,
          addOptionPrice,
          adjRoomPrice,
          payAmount,
          priceSum,
          remainAmount,
          reserveStatus,
        }) => (
          <tr key={rrNo}>
            <td>{reserveNum}</td>
            <td>{formatyyyyMMddWithHyphen(stringToDate(regDate))}</td>
            <td>{agentName}</td>
            <td>{userName}</td>
            <td>{userPhone}</td>
            <td>{checkinDate}</td>
            <td>{checkoutDate}</td>
            <td>{`${betweenyyyyMMdd(checkinDate, checkoutDate)}N`}</td>
            <td>에어비앤비</td>
            <td>{acName}</td>
            <td>{rtName}</td>
            <td>{rmName}</td>
            <td>{formatMoney(roomSalePrice)}</td>
            <td>{formatMoney(addPersionPrice)}</td>
            <td>{formatMoney(addOptionPrice)}</td>
            <td>{formatMoney(adjRoomPrice)}</td>
            <td>{formatMoney(payAmount)}</td>
            <td>{formatMoney(priceSum)}</td>
            <td>{formatMoney(remainAmount)}</td>
            <td>카드</td>
            <td>
              <span
                className='state s1'
                style={{ background: reservationStatusColorMap[reserveStatus] }}
              >
                {getKeyFromValue(reservationStatusMap, reserveStatus)}
              </span>
            </td>
            <td>상세보기</td>
          </tr>
        )
      )}
    </>
  )
}
export const calculateAmount = (reservationList) => {
  let totalNight = 0
  let totalRoomSalePrice = 0
  let totalAddPersionPrice = 0
  let totalAddOptionPrice = 0
  let totalAdjRoomPrice = 0
  let totalPayAmount = 0
  let totalPriceSum = 0
  let totalRemainAmount = 0

  reservationList.forEach(
    ({
      roomSalePrice,
      addPersionPrice,
      addOptionPrice,
      adjRoomPrice,
      payAmount,
      priceSum,
      remainAmount,
      checkinDate,
      checkoutDate,
    }) => {
      totalNight += Number(betweenyyyyMMdd(checkinDate, checkoutDate))
      totalRoomSalePrice += roomSalePrice
      totalAddPersionPrice += addPersionPrice
      totalAddOptionPrice += addOptionPrice
      totalAdjRoomPrice += adjRoomPrice
      totalPayAmount += payAmount
      totalPriceSum += priceSum
      totalRemainAmount += remainAmount
    }
  )

  return {
    totalNight,
    totalRoomSalePrice,
    totalAddPersionPrice,
    totalAddOptionPrice,
    totalAdjRoomPrice,
    totalPayAmount,
    totalPriceSum,
    totalRemainAmount,
  }
}
