import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { dayCountAtom, lockedRoomListAtom, reservationListAtom, standardDateAtom } from '../../../../../service/state/reservation/atom'
import { getCurrentCalendar, getCurrentLockedRoomList, getCurrentMonthPrice, getCurrentReservationList } from './RoomReservationFunction'
import RoomReservationPresenter from './RoomReservationPresenter'

export default function RoomReservationContainer({ monthPriceList, roomNumber }) {
  const reservationList = useRecoilValue(reservationListAtom)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)

  const currentMonthPriceList = getCurrentMonthPrice(monthPriceList, standardDate, dayCount)
  const currentReservationList = useMemo(() => getCurrentReservationList(reservationList, standardDate, dayCount, roomNumber), [reservationList, standardDate, dayCount, roomNumber])
  const currentLockedRoomList = useMemo(() => getCurrentLockedRoomList(lockedRoomList, standardDate, dayCount, roomNumber), [lockedRoomList, standardDate, dayCount, roomNumber])

  const currentCalendarList = useMemo(
    () => getCurrentCalendar(currentMonthPriceList, currentReservationList, currentLockedRoomList, standardDate),
    [currentMonthPriceList, currentReservationList, currentLockedRoomList, standardDate]
  )

  return <RoomReservationPresenter currentCalendarList={currentCalendarList} currentReservationList={currentReservationList} roomNumber={roomNumber} />
}
