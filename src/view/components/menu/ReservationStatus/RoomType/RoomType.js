import { useRecoilValue } from 'recoil'
import { reservationListAtom } from '@state/reservation'
import RoomReservation from './RoomReservation'

export default function RoomType({ roomType, style }) {
  const reservationList = useRecoilValue(reservationListAtom)
  return (
    <div className='scheduler-rows dF-f' style={style}>
      <div className='room-type'>{roomType.rtName}</div>
      <div className='room-number'>
        {roomType.rooms.map((room, index) => (
          <div key={index}>{room.rmName}</div>
        ))}
      </div>
      <div className='room-state'>
        <RoomReservation
          monthPriceList={roomType.roomPrices}
          roomNumber={1}
          filteredReservationList={reservationList}
        />
      </div>
    </div>
  )
}
