import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { isDisplayCreateReservationAtom, standardDateAtom } from '@state/reservation'
import CreateReservation from '@components/menu/ReservationStatus/Popup/CreateReservation/CreateReservation'
import ReservationInfo from '@components/menu/ReservationStatus/Overlay/ReservationInfo'
import RoomType from '@components/menu/ReservationStatus/RoomType/RoomType'
import ReservationStatusHeader from '@components/menu/ReservationStatus/ReservationStatusHeader'
import ReservationSchedulerHeader from '@components/menu/ReservationStatus/TableHeader/ReservationSchedulerHeader'
import { useScroll } from '@hook/uiHook/useScroll'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import { readReservationPriceSelector } from '@state/reservationStatus/reservationStatus'
import { currentAccommodationAtom } from '@state/common/common'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns'

export default function Container() {
  //전역상태
  // const roomTypeList = useRecoilValue(roomTypeListAtom)
  const isDisplayCreateReservation = useRecoilValue(isDisplayCreateReservationAtom)

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const {
    data: {
      data: { roomTypes },
    },
  } = useRecoilValue(readReservationPriceSelector(parameter))
  console.log(roomTypes)

  //지역상태
  const [renderRestRoomType, setRenderRestRoomType] = useState(15)

  //지역변수
  console.log('지역변수')
  const roomTypeList = roomTypes
  const roomTypeListLength = roomTypeList.length

  //hook
  const { scrollY, canScrollCheck } = useScroll()

  //함수
  //10개를 먼저 렌더링하고 스크롤 하면 나머지를 모두 렌더링 하기
  const makeRoomTypes = (length) => {
    const roomTypes = roomTypeList
      .slice(0, length)
      .map((roomType, index) => <RoomType key={index} roomType={roomType} />)

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
