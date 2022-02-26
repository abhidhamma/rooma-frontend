import { useRecoilValue } from 'recoil'
import { reservationListAtom } from '../../../../service/state/reservation'
import RoomReservation from './RoomReservation'

export default function RoomType({ roomType, style }) {
  const reservationList = useRecoilValue(reservationListAtom)
  return (
    <div className='scheduler-rows dF-f' style={style}>
      {/* <!-- 01 --> */}
      <div className='room-type'>{roomType.roomTypeName}</div>
      <div className='room-number'>
        {roomType.roomNumbers.map((roomNumber, index) => (
          <div key={index}>{roomNumber}</div>
        ))}
      </div>
      <div className='room-state'>
        {roomType.roomNumberData.map((monthPriceList, index) => {
          const roomNumber = roomType.roomNumbers[index]
          const filteredReservationList = reservationList.filter((reservation) => reservation.location === roomNumber)
          return <RoomReservation key={roomNumber} monthPriceList={monthPriceList} roomNumber={roomNumber} filteredReservationList={filteredReservationList} />
        })}
      </div>
    </div>
  )
}
