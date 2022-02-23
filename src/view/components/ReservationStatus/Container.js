import { useRecoilValue } from 'recoil'
import { isDisplayCreateReservationAtom, roomTypeListAtom } from '../../../service/state/reservation/atom'
import CreateReservation from './Popup/CreateReservation'
import ReservationInfo from './Overlay/ReservationInfo'
import ReservationScheulerHeader from './ReservationScheuler/ReservationScheulerHeader'
import RoomType from './RoomType/RoomType'
import ReservationStatusHeader from './ReservationStatusHeader'

export default function Container() {
  const roomTypeList = useRecoilValue(roomTypeListAtom)

  const isDisplayCreateReservation = useRecoilValue(isDisplayCreateReservationAtom)

  // console.log(reservationList)
  // console.log(roomTypeList)

  return (
    <>
      <section>{isDisplayCreateReservation && <CreateReservation />}</section>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='full-content reserv-state'>
          <ReservationStatusHeader />
          <div className='timetable'>
            <ReservationScheulerHeader />
            <div className='scheduler-view'>
              {roomTypeList.map((roomType, index) => (
                <RoomType key={index} roomType={roomType} />
              ))}
              {/* <!-- S:layer --> */}
              <ReservationInfo />
              {/* <!-- E:layer --> */}
            </div>
          </div>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
