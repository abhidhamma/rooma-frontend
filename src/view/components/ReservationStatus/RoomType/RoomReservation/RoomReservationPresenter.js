import { formatyyyyMMdd } from '../../../../../other/util/common/dateUtil'
import Price from '../Price'

export default function RoomReservationPresenter({ currentCalendarList, currentReservationList, roomNumber }) {
  console.log('RoomReservationPresenter render!')
  console.log('!!!!!!!!!!구분선!!!!!!!!!!')
  return (
    <>
      {currentCalendarList.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <div className='dF-f'>
          {currentCalendarList.map((day) => {
            const dayId = day.id
            const currentDate = formatyyyyMMdd(day.date)
            const currentReservation = day.reservation
            const currentLockedRoom = day.lockedRoom

            return currentReservation === undefined ? (
              <Price key={dayId} price={day.price} currentDate={currentDate} roomNumber={roomNumber} lockedRoom={currentLockedRoom} currentReservationList={currentReservationList} />
            ) : (
              <Price key={dayId} price={day.price} currentDate={currentDate} roomNumber={roomNumber} reservation={currentReservation} currentReservationList={currentReservationList} />
            )
          })}
        </div>
      )}
    </>
  )
}
