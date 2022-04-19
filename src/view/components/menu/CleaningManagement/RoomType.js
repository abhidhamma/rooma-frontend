import RoomName from '../ReservationStatus/RoomType/RoomName'
import Room from './Room'

export default function RoomType({ roomType }) {
  return (
    <div className='scheduler-rows dF-f'>
      {/* <!-- 01 --> */}
      <div className='room-type'>{roomType.rtName}</div>
      <div className='room-number'>
        {roomType.rooms.map((room, index) => (
          <RoomName
            rtName={roomType.rtName}
            room={room}
            key={index}
            rmNo={room.rmNo}
            reservationList={room.reserves}
            lockedRoomList={room.locks}
          />
        ))}
      </div>
      <div className='room-state'>
        {roomType.rooms.map((room, index) => (
          <Room key={index} room={room} rmNo={room.rmNo} rtNo={roomType.rtNo} />
        ))}
      </div>
    </div>
  )
}
