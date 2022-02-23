import { useRecoilValue } from 'recoil'
import { addyyyyMMdd, formatyyyyMMdd } from '../../../../../other/util/common/dateUtil'
import { getDateArray } from '../../../../../other/util/reservation/reservation'
import { dayCountAtom, lockedRoomListAtom, reservationListAtom, standardDateAtom } from '../../../../../service/state/reservation/atom'
import { getCurrentCalendar, getCurrentMonthPrice, getCurrentReservationList } from './RoomReservationFunction'
import RoomReservationPresenter from './RoomReservationPresenter'

export default function RoomReservationContainer({ monthPriceList, roomNumber }) {
  const reservationList = useRecoilValue(reservationListAtom)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)

  const currentMonthPriceList = getCurrentMonthPrice(monthPriceList, standardDate, dayCount)
  const currentReservationList = getCurrentReservationList(reservationList, standardDate, dayCount, roomNumber)
  const currentLockedRoomList = getCurrentLockedRoomList(lockedRoomList, standardDate, dayCount, roomNumber)

  const currentCalendarList = getCurrentCalendar(currentMonthPriceList, currentReservationList, currentLockedRoomList, standardDate)

  return <RoomReservationPresenter currentCalendarList={currentCalendarList} roomNumber={roomNumber} />
}

const getCurrentLockedRoomList = (lockedRoomList, standardDate, dayCount, roomNumber) => {
  const currentyyyyMMdd = formatyyyyMMdd(standardDate)
  const endyyyyMMdd = addyyyyMMdd(currentyyyyMMdd, dayCount)
  const currentCalendarDateArray = getDateArray(currentyyyyMMdd, endyyyyMMdd)
  return lockedRoomList.filter((lockedRoom) => {
    if (lockedRoom.location !== roomNumber) {
      return false
    }
    if (currentCalendarDateArray.indexOf(lockedRoom.targetDate) > -1) {
      return true
    }
    return false
  })
}
