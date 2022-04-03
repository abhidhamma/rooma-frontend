import { useRecoilValue } from 'recoil'
import { isDisplayCreateReservationAtom, isDisplayReadReservationAtom } from '@state/reservation'
import CreateReservation from '@components/menu/ReservationStatus/Popup/ReservationPopup/CreateReservation/CreateReservation'
import ReservationInfo from '@components/menu/ReservationStatus/Overlay/ReservationInfo'

import ReservationStatusHeader from '@components/menu/ReservationStatus/ReservationStatusHeader'
import ReservationSchedulerHeader from '@components/menu/ReservationStatus/TableHeader/ReservationSchedulerHeader'
import RightClickPopUp from './Popup/RightClickPopup/RightClickPopup'
import ReadReservation from './Popup/ReservationPopup/ReadReservation/ReadReservation'
import RoomTypeContainer from './RoomType/RoomType/RoomTypeContainer'
import React, { Suspense } from 'react'

function Container() {
  //전역상태
  // const roomTypeList = useRecoilValue(roomTypeListAtom)
  const isDisplayCreateReservation = useRecoilValue(isDisplayCreateReservationAtom)
  const isDisplayReadReservation = useRecoilValue(isDisplayReadReservationAtom)

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
              {/* {makeRoomTypes(renderRestRoomType)} */}
              <Suspense fallback={<div></div>}>
                <RoomTypeContainer />
              </Suspense>

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
export default React.memo(Container)
