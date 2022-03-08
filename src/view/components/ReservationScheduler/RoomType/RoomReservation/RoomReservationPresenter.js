import React from 'react'
import { formatyyyyMMdd } from '@util/common/dateUtil'
import Price from '@components/ReservationScheduler/RoomType/Price'

function RoomReservationPresenter({ currentCalendarList, currentReservationList, roomNumber }) {
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
export default React.memo(RoomReservationPresenter)
