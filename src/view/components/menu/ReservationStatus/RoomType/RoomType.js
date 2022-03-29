import { useRecoilValue } from 'recoil'
import { reservationListAtom } from '@state/reservation'
import RoomReservation from './RoomReservation'
import RoomName from './RoomName'

export default function RoomType({ roomType, style }) {
  const reservationList = useRecoilValue(reservationListAtom)
  return (
    <div className='scheduler-rows dF-f' style={style}>
      <div className='room-type'>{roomType.rtName}</div>
      <div className='room-number'>
        {roomType.rooms.map((room, index) => (
          <RoomName room={room} key={index} rmNo={room.rmNo} />
        ))}
      </div>
      <div className='room-state'>
        {roomType.rooms.map((room, index) => (
          <RoomReservation
            key={index}
            monthPriceList={roomType.roomPrices}
            roomNumber={room.rmName}
            filteredReservationList={reservationList}
            currentReservationList={room.reserves}
            lockedRoomList={room.locks}
            rmNo={room.rmNo}
          />
        ))}
      </div>
    </div>
  )
}
