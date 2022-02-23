import RoomReservation from './RoomReservation'

export default function RoomType({ roomType }) {
  return (
    <div className='scheduler-rows dF-f'>
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
          return <RoomReservation key={roomNumber} monthPriceList={monthPriceList} roomNumber={roomNumber} />
        })}
      </div>
    </div>
  )
}
