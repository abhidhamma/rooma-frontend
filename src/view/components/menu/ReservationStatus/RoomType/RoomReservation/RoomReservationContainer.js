import _ from 'lodash'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import { getCurrentCalendar, getCurrentMonthPrice } from './RoomReservationFunction'
import RoomReservationPresenter from './RoomReservationPresenter'

function RoomReservationContainer({
  monthPriceList,
  roomNumber,
  filteredReservationList,
  currentReservationList,
  lockedRoomList,
  cleaningRoomList,
  rmNo,
  rtNo,
}) {
  // const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)

  const currentMonthPriceList = getCurrentMonthPrice(monthPriceList, standardDate, dayCount)
  // const currentReservationList = useMemo(
  //   () => getCurrentReservationList(filteredReservationList, standardDate, dayCount, roomNumber),
  //   [filteredReservationList, standardDate, dayCount, roomNumber]
  // )
  // const currentLockedRoomList = useMemo(
  //   () => getCurrentLockedRoomList(lockedRoomList, standardDate, dayCount, roomNumber),
  //   [lockedRoomList, standardDate, dayCount, roomNumber]
  // )
  const currentLockedRoomList = lockedRoomList
  const currentCleaningRoomList = cleaningRoomList

  const currentCalendarList = useMemo(
    () =>
      getCurrentCalendar(
        currentMonthPriceList,
        currentReservationList,
        currentLockedRoomList,
        currentCleaningRoomList,
        standardDate,
        dayCount
      ),
    [
      currentMonthPriceList,
      currentReservationList,
      currentLockedRoomList,
      currentCleaningRoomList,
      standardDate,
    ]
  )

  return (
    <RoomReservationPresenter
      currentCalendarList={currentCalendarList}
      currentReservationList={currentReservationList}
      roomNumber={roomNumber}
      rmNo={rmNo}
      rtNo={rtNo}
    />
  )
}
// const filteredReservationListPropsEqual = (prev, next) =>
//   _.isEqual(prev.filteredReservationList, next.filteredReservationList)
// export default React.memo(RoomReservationContainer, filteredReservationListPropsEqual)
export default RoomReservationContainer
