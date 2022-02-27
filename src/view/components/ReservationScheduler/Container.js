import { useRecoilValue } from 'recoil'
import { isDisplayCreateReservationAtom, roomTypeListAtom } from '../../../service/state/reservation'
import CreateReservation from './Popup/CreateReservation'
import ReservationInfo from './Overlay/ReservationInfo'
import RoomType from './RoomType/RoomType'
import ReservationStatusHeader from './ReservationStatusHeader'
import ReservationSchedulerHeader from './TableHeader/ReservationSchedulerHeader'
import { useScroll } from '../../hook/useScroll'
import { useEffect, useState } from 'react'
import Loading from './Loading'

export default function Container() {
  //전역상태
  const roomTypeList = useRecoilValue(roomTypeListAtom)
  const isDisplayCreateReservation = useRecoilValue(isDisplayCreateReservationAtom)

  //지역상태
  const [renderRestRoomType, setRenderRestRoomType] = useState(15)

  //지역변수
  const roomTypeListLength = roomTypeList.length

  //hook
  const { scrollY, canScrollCheck } = useScroll()

  //함수
  //10개를 먼저 렌더링하고 스크롤 하면 나머지를 모두 렌더링 하기
  const makeRoomTypes = (length) => {
    const roomTypes = roomTypeList.slice(0, length).map((roomType, index) => <RoomType key={index} roomType={roomType} />)

    if (length === 15 && roomTypeListLength > 15) {
      roomTypes.push(<Loading />)
    }

    return roomTypes
  }

  useEffect(() => {
    if (scrollY > 0 && canScrollCheck) {
      setRenderRestRoomType(roomTypeListLength)
    }
  }, [scrollY])

  return (
    <>
      <section>{isDisplayCreateReservation && <CreateReservation />}</section>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='full-content reserv-state'>
          <ReservationStatusHeader />
          <div className='timetable'>
            <ReservationSchedulerHeader />
            <div className='scheduler-view'>
              {makeRoomTypes(renderRestRoomType)}
              {/* {roomTypeList.map((roomType, index) => (
                <RoomType key={index} roomType={roomType} />
              ))} */}
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
