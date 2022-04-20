import Room from './Room'

export default function RoomType({ roomType }) {
  return (
    <div className='scheduler-rows dF-f'>
      {/* <!-- 01 --> */}
      <div className='room-type'>{roomType.rtName}</div>
      <div className='room-number'>
        {roomType.rooms.map((room, index) => (
          <div key={index} style={{ width: '150px' }}>
            <span>{room.rmName}</span>
          </div>
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
