import React from 'react'
import { formatyyyyMMdd, stringToDate } from '@util/common/dateUtil'
import Price from '@components/menu/ReservationStatus/RoomType/Price'

function RoomReservationPresenter({ currentCalendarList, currentReservationList, roomNumber }) {
  return (
    <>
      {currentCalendarList.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <div className='dF-f'>
          {currentCalendarList.map((day, index) => {
            const currentDate = formatyyyyMMdd(stringToDate(day.targetDate))
            const currentReservation = day.reservation
            const currentLockedRoom = day.lockedRoom

            //66500원인경우 6.6만으로 표시(칸 넓이 제한으로 소수점 둘째에서 반올림)
            const price = Math.round(day.originPrice / 1000) / 10

            return currentReservation === undefined ? (
              <Price
                key={index}
                price={price}
                currentDate={currentDate}
                roomNumber={roomNumber}
                lockedRoom={currentLockedRoom}
                currentReservationList={currentReservationList}
              />
            ) : (
              <Price
                key={index}
                price={price}
                currentDate={currentDate}
                roomNumber={roomNumber}
                reservation={currentReservation}
                currentReservationList={currentReservationList}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
export default React.memo(RoomReservationPresenter)
