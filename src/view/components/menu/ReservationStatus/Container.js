import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import {
  isDisplayCreateReservationAtom,
  isDisplayReadReservationAtom,
  standardDateAtom,
} from '@state/reservation'
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
import RightClickPopUp from './Popup/RightClickPopup/RightClickPopup'
import ReadReservation from './Popup/CreateReservation/ReadReservation'

export default function Container() {
  //전역상태
  // const roomTypeList = useRecoilValue(roomTypeListAtom)
  const isDisplayCreateReservation = useRecoilValue(isDisplayCreateReservationAtom)
  const isDisplayReadReservation = useRecoilValue(isDisplayReadReservationAtom)

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const data = useRecoilValue(readReservationPriceSelector(parameter))
  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  useEffect(() => {
    resetReadReservationPrice()
    return () => {
      resetReadReservationPrice()
    }
  }, [])

  //지역상태
  const [renderRestRoomType, setRenderRestRoomType] = useState(15)

  //지역변수
  const roomTypeList = data?.data?.data === null ? [] : data.data.data.roomTypes
  const roomTypeListLength = data?.data?.data === null ? 0 : data.data.data.roomTypes.length

  //hook
  const { scrollY, canScrollCheck } = useScroll()

  //함수
  //10개를 먼저 렌더링하고 스크롤 하면 나머지를 모두 렌더링 하기
  const makeRoomTypes = (length) => {
    if (roomTypeListLength === 0 || typeof roomTypeList === 'undefined') {
      return
    }

    const roomTypes = roomTypeList
      // .slice(0, length)
      .filter((roomType) => roomType.roomPrices.length !== 0)
      .filter((roomType) => roomType.rooms.length !== 0)
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
      <section>{isDisplayReadReservation && <ReadReservation />}</section>
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
              <RightClickPopUp />
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
