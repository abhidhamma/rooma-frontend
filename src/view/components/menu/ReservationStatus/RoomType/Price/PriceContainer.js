import React, { useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'
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
import {
  readReservationPriceSelector,
  rightClickPopupAtom,
  updateReservationDateSelector,
} from '@state/reservationStatus/reservationStatus'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom, dimmdLayerAtom } from '@state/common/common'
import { addDays } from 'date-fns'

function PriceContainer({
  price,
  currentDate,
  roomNumber,
  reservation,
  lockedRoom,
  currentReservationList,
  rmNo,
  rtNo,
}) {
  const updateReservationDateCallback = useApiCallback('updateReservationDate')
  const dayCount = useRecoilValue(dayCountAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const setDisplay = useSetRecoilState(displayAtom)
  const setOverlay = useSetRecoilState(overlayAtom)
  const setReservationList = useSetRecoilState(reservationListAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const setIsDisplayCreateReservation = useSetRecoilState(isDisplayCreateReservationAtom)
  const setCreateReservation = useSetRecoilState(createReservationAtom)
  const setRightClickPopupProperty = useSetRecoilState(rightClickPopupAtom)

  const accommodation = useRecoilValue(currentAccommodationAtom)

  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  const updateReservation = (updateReservationDateCallback) => (parameter) => {
    const isConfirm = window.confirm('예약정보를 변경하시겠습니까?')

    if (isConfirm) {
      updateReservationDateCallback(updateReservationDateSelector(parameter)).then((result) => {
        // console.log(result)
        const { message } = result
        if (message === '저장되었습니다.') {
          // alert(message)
          resetReadReservationPrice()
        }
      })
    }
  }

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
          rmNo,
          price
        ),
      drop: (item) =>
        dropEffect(
          item,
          setDisplay,
          setOverlay,
          setReservationList,
          currentDate,
          roomNumber,
          updateReservation(updateReservationDateCallback),
          rmNo
        ),
      // collect: (monitor) => ({
      //   isOver: !!monitor.isOver(),
      //   canDrop: !!monitor.canDrop(),
      // }),
      hover: (item) => throttleHoverEffect(item, setOverlay),
    }),
    [currentReservationList]
  )

  const handleCreateReservation = useCallback(() => {
    setIsShowDimmdLayer(true)
    setIsDisplayCreateReservation((prev) => !prev)
    setCreateReservation((prev) => ({
      ...prev,
      checkinDate: stringToDate(currentDate),
      checkoutDate: addDays(stringToDate(currentDate), 1),
      rmNo,
      rtNo,
    }))
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
      roomNumber={roomNumber}
      rmNo={rmNo}
      rtNo={rtNo}
    />
  )
}
// const filteredReservationListPropsEqual = (prev, next) =>
//   _.isEqual(prev.currentReservationList, next.currentReservationList) &&
//   _.isEqual(prev.reservation, next.reservation)
// export default React.memo(PriceContainer, filteredReservationListPropsEqual)
export default PriceContainer
