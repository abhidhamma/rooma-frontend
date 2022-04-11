import RoomReservation from '../RoomReservation'
import RoomName from '../RoomName'

export default function RoomTypePresenter({ roomType, style }) {
  return (
    <div className='scheduler-rows dF-f' style={style}>
      <div className='room-type'>{`${roomType.rtName} ${roomType.rtNo}`}</div>
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
          <RoomReservation
            key={index}
            monthPriceList={roomType.roomPrices}
            roomNumber={room.rmName}
            currentReservationList={room.reserves}
            lockedRoomList={room.locks}
            cleaningRoomList={room.cleanings}
            rmNo={room.rmNo}
            rtNo={roomType.rtNo}
          />
        ))}
      </div>
    </div>
  )
}
