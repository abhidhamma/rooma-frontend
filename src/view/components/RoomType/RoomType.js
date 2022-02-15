import { useRecoilValue } from 'recoil'
import { dayCountAtom } from '../../../data/state'
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
        {roomType.monthPriceList.map((monthPrice, index) => (
          <RoomReservation key={index} monthPrice={monthPrice} />
        ))}
      </div>
    </div>
  )
}
