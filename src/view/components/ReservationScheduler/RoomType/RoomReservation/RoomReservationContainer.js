import _ from 'lodash'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { dayCountAtom, lockedRoomListAtom, standardDateAtom } from '@state/reservation'
import { getCurrentCalendar, getCurrentLockedRoomList, getCurrentMonthPrice, getCurrentReservationList } from './RoomReservationFunction'
import RoomReservationPresenter from './RoomReservationPresenter'

function RoomReservationContainer({ monthPriceList, roomNumber, filteredReservationList }) {
  console.log('RoomReservationContainer render : ', roomNumber)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)

  const currentMonthPriceList = getCurrentMonthPrice(monthPriceList, standardDate, dayCount)
  const currentReservationList = useMemo(() => getCurrentReservationList(filteredReservationList, standardDate, dayCount, roomNumber), [filteredReservationList, standardDate, dayCount, roomNumber])
  const currentLockedRoomList = useMemo(() => getCurrentLockedRoomList(lockedRoomList, standardDate, dayCount, roomNumber), [lockedRoomList, standardDate, dayCount, roomNumber])

  const currentCalendarList = useMemo(
    () => getCurrentCalendar(currentMonthPriceList, currentReservationList, currentLockedRoomList, standardDate),
    [currentMonthPriceList, currentReservationList, currentLockedRoomList, standardDate]
  )

  return <RoomReservationPresenter currentCalendarList={currentCalendarList} currentReservationList={currentReservationList} roomNumber={roomNumber} />
}
const filteredReservationListPropsEqual = (prev, next) => _.isEqual(prev.filteredReservationList, next.filteredReservationList)
export default React.memo(RoomReservationContainer, filteredReservationListPropsEqual)
