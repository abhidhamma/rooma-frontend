import React, { useState } from 'react'
import { getDateArray } from '@util/reservation/reservation'
import ReservationOverlay from '@components/menu/ReservationStatus/Overlay/ReservationOverlay'
import SourceOverlay from '@components/menu/ReservationStatus/Overlay/SourceOverlay'
import TargetOverlay from '@components/menu/ReservationStatus/Overlay/TargetOverlay'
import { formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { isMouseDownAtom, selectedCellArrayAtom } from '@state/reservationStatus/reservationStatus'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { createReservationAtom } from '@state/reservationStatus/createReservation'
import { isDisplayCreateReservationAtom } from '@state/reservation'
import { dimmdLayerAtom } from '@state/common/common'
import { addDays } from 'date-fns'
import { CLEANING_STATUS } from '@constant/constantVariable'

function PricePresenter({
  drop,
  reservation,
  currentDate,
  price,
  isDragging,
  isOver,
  handleCreateReservation,
  handleRightClickPopup,
  dayCount,
  drag,
  lockedRoom,
  cleaningRoom,
  roomNumber,
  rmNo,
  rtNo,
}) {
  //달력이 걸치는 경우? checkIn부터 checkOut까지의 값을 모두 넣고 indexOf로 currentDate와 동일한게 있는지 찾는다
  let reservationDateArray = []

  if (reservation !== undefined) {
    reservationDateArray = getDateArray(reservation?.checkIn, reservation?.checkOut)
  }

  const [selectedCellArray, setSelectedCellArray] = useRecoilState(selectedCellArrayAtom)
  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownAtom)
  const setCreateReservation = useSetRecoilState(createReservationAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const setIsDisplayCreateReservation = useSetRecoilState(isDisplayCreateReservationAtom)
  const handleMouseDown = (event) => {
    event.preventDefault()
    setIsMouseDown(true)
    setSelectedCellArray((prev) => ({
      ...prev,
      // checkinDate: stringToDate(currentDate),
      // checkoutDate: stringToDate(currentDate),
      [`${roomNumber}${currentDate}`]: true,
      currentRoomNumber: roomNumber,
    }))
    setCreateReservation((prev) => ({
      ...prev,
      rmNo,
      rtNo,
      checkinDate: stringToDate(currentDate),
    }))
  }
  const handleMouseOver = () => {
    if (isMouseDown) {
      if (selectedCellArray.currentRoomNumber !== roomNumber) {
        alert('서로 다른 객실을 연속예약할 수 없습니다.')
        setIsMouseDown(false)
        setSelectedCellArray({})
      } else {
        setSelectedCellArray((prev) => ({
          ...prev,
          [`${roomNumber}${currentDate}`]: true,
          // checkoutDate: stringToDate(currentDate),
        }))
      }
    }
  }
  const handleMouseUp = () => {
    console.log(Object.values(selectedCellArray).length)
    if (Object.values(selectedCellArray).length > 2) {
      setIsShowDimmdLayer(true)
      setIsDisplayCreateReservation((prev) => !prev)
      setCreateReservation((prev) => ({ ...prev, checkoutDate: stringToDate(currentDate) }))
    }
  }

  // const getBackground = (selectedCellArray) => {
  //   if (selectedCellArray === null) {
  //     return 'none'
  //   }
  //   const { checkinDate, checkoutDate } = selectedCellArray

  //   let tempArray = []
  //   for (let i = checkinDate; i <= checkoutDate; i = addDays(checkinDate, 1)) {
  //     tempArray = [...tempArray, i]
  //   }
  //   return tempArray
  // }
  // console.log('selecetedCellArray')
  // console.log(getBackground(selectedCellArray))
  console.log('cleaningRoom')
  console.log(cleaningRoom)

  return (
    <>
      <div
        ref={drop}
        onContextMenu={handleRightClickPopup(reservation, lockedRoom, cleaningRoom)}
        style={{
          background: selectedCellArray[`${roomNumber}${currentDate}`] ? 'antiquewhite' : 'none',
        }}
      >
        {lockedRoom?.lockDate === formatyyyyMMddWithHyphen(stringToDate(currentDate)) ? (
          <div className='lock'>
            <span className='hdn'>잠김</span>
          </div>
        ) : cleaningRoom?.workDate === formatyyyyMMddWithHyphen(stringToDate(currentDate)) &&
          cleaningRoom?.cleaningStatus !== CLEANING_STATUS.FINISHED ? (
          <div>
            <div
              className='cleaning'
              style={{ position: 'absolute', width: '100%', zIndex: '10' }}
            ></div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseUp={handleMouseUp}
            onDoubleClick={handleCreateReservation}
          >
            <a
              href='#'
              className={reservation?.checkIn === currentDate ? '' : 'none'}
              style={{ display: 'block', placeSelf: 'center' }}
            >
              {`${isNaN(price) ? 'X' : `${price}만`}`}
            </a>
          </div>
        )}

        {/* reservation */}
        {reservationDateArray?.indexOf(currentDate) > -1 && !isDragging && (
          <ReservationOverlay
            data={reservation}
            drag={drag}
            dayCount={dayCount}
            currentDate={currentDate}
            roomNumber={roomNumber}
            cleaningRoom={cleaningRoom}
            rtNo={rtNo}
          />
        )}
        {/* hover overlay */}
        {isOver && <TargetOverlay />}
        {/* source overlay */}
        {isDragging && <SourceOverlay />}
      </div>
    </>
  )
}
// export default React.memo(PricePresenter)
export default PricePresenter
