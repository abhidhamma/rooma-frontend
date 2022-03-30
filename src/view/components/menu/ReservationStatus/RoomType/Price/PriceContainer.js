import React, { useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  dayCountAtom,
  displayAtom,
  isDisplayCreateReservationAtom,
  lockedRoomListAtom,
  overlayAtom,
  reservationListAtom,
  standardDateAtom,
} from '@state/reservation'
import { canDropEffect, dropEffect, itemEffect, throttleHoverEffect } from './PriceFunction'
import PricePresenter from './PricePresenter'
import { createReservationAtom } from '@state/reservationStatus/createReservation'
import { formatyyyyMMdd, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { rightClickPopupAtom } from '@state/reservationStatus/reservationStatus'

function PriceContainer({
  price,
  currentDate,
  roomNumber,
  reservation,
  lockedRoom,
  currentReservationList,
  rmNo,
}) {
  const dayCount = useRecoilValue(dayCountAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const setDisplay = useSetRecoilState(displayAtom)
  const setOverlay = useSetRecoilState(overlayAtom)
  const setReservationList = useSetRecoilState(reservationListAtom)
  const setIsDisplayCreateReservation = useSetRecoilState(isDisplayCreateReservationAtom)
  const setCreateReservation = useSetRecoilState(createReservationAtom)
  const setRightClickPopupProperty = useSetRecoilState(rightClickPopupAtom)

  //useDrag, useDrop
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'item',
      item: () =>
        itemEffect(
          currentReservationList,
          currentDate,
          standardDate,
          setOverlay,
          roomNumber,
          setDisplay
        ),
      // collect: (monitor) => ({
      //   isDragging: !!monitor.isDragging(),
      // }),
    }),
    [currentReservationList]
  )
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      canDrop: (item) =>
        canDropEffect(
          item,
          currentReservationList,
          lockedRoomList,
          lockedRoom,
          currentDate,
          roomNumber
        ),
      drop: (item) =>
        dropEffect(item, setDisplay, setOverlay, setReservationList, currentDate, roomNumber),
      // collect: (monitor) => ({
      //   isOver: !!monitor.isOver(),
      //   canDrop: !!monitor.canDrop(),
      // }),
      hover: (item) => throttleHoverEffect(item, setOverlay),
    }),
    [currentReservationList]
  )

  const handleCreateReservation = useCallback(() => {
    setIsDisplayCreateReservation((prev) => !prev)
    setCreateReservation((prev) => ({ ...prev, currentDate: stringToDate(currentDate) }))
  }, [standardDate])

  const handleRightClickPopup = (reservation, lockedRoom) => (event) => {
    const { clientX, clientY } = event
    event.preventDefault()
    console.log(clientX, clientY)
    const isLocked = lockedRoom !== undefined
    const reservationStatus = reservation?.reserveStatus
    setRightClickPopupProperty((prev) => ({
      ...prev,
      display: 'block',
      top: clientY - 230,
      left: Math.min(clientX, window.innerWidth - 180),
      hideLock: reservation === undefined,
      rmNo,
      rrNo: reservation?.rrNo,
      lockDate: formatyyyyMMddWithHyphen(stringToDate(currentDate)),
      isLocked,
      reservationStatus,
    }))
  }

  if (reservation !== undefined) {
    reservation = {
      ...reservation,
      checkIn: formatyyyyMMdd(stringToDate(reservation.checkinDate)),
      checkOut: formatyyyyMMdd(stringToDate(reservation.checkoutDate)),
    }
  }

  return (
    <PricePresenter
      drop={drop}
      drag={drag}
      isDragging={isDragging}
      isOver={isOver}
      price={price}
      reservation={reservation}
      lockedRoom={lockedRoom}
      currentDate={currentDate}
      dayCount={dayCount}
      handleCreateReservation={handleCreateReservation}
      handleRightClickPopup={handleRightClickPopup}
    />
  )
}
// const filteredReservationListPropsEqual = (prev, next) =>
//   _.isEqual(prev.currentReservationList, next.currentReservationList) &&
//   _.isEqual(prev.reservation, next.reservation)
// export default React.memo(PriceContainer, filteredReservationListPropsEqual)
export default PriceContainer
