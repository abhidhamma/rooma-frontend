import RoomName from '../ReservationStatus/RoomType/RoomName'

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
          <div className='dF-f' key={index}>
            <div className='clean-info'>
              <a href='#' className='clean-state start'>
                청소요청
              </a>
              <select>
                <option>담당자선택</option>
              </select>
            </div>
            <div className='clean-info'>
              <a href='#' className='clean-state ing'>
                청소중
              </a>
              <select>
                <option>담당자선택</option>
              </select>
            </div>
            <div className='clean-info'>
              <a href='#' className='clean-state ready'>
                요청전
              </a>
              <select>
                <option>담당자선택</option>
              </select>
            </div>
            <div className='clean-info'>
              <a href='#' className='clean-state finish'>
                청소완료
              </a>
              <select>
                <option>담당자선택</option>
              </select>
            </div>
            <div className='clean-info'>
              <a href='#' className='clean-state ing'>
                청소중
              </a>
              <select>
                <option>담당자선택</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
