import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getDateArray } from '../../../../../other/util/reservation/reservation'
import { dayCountAtom, displayAtom, isDisplayCreateReservationAtom, lockedRoomListAtom, reservationListAtom, standardDateAtom } from '../../../../../service/state/reservation/atom'
import { dropEffect, itemEffect, throttleCanDropEffect, throttleHoverEffect } from './PriceFunction'
import PricePresenter from './PricePresenter'

export default function PriceContainer({ price, currentDate, roomNumber, reservation, lockedRoom }) {
  const [overlay, setOverlay] = useState({ hoverColor: '', hoverData: '', hoverLength: '' })

  const dayCount = useRecoilValue(dayCountAtom)
  const [reservationList, setReservationList] = useRecoilState(reservationListAtom)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const [isDisplayCreateReservation, setIsDisplayCreateReservation] = useRecoilState(isDisplayCreateReservationAtom)
  const [display, setDisplay] = useRecoilState(displayAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const filteredReservationList = reservationList.filter((reservation) => reservation.location === roomNumber)

  //useDrag, useDrop
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'item',
      item: () => itemEffect(filteredReservationList, currentDate, standardDate, setOverlay, roomNumber),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [reservationList, reservation, currentDate]
  )
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      canDrop: (item) => throttleCanDropEffect(item, reservationList, lockedRoomList, currentDate, roomNumber),
      drop: (item) => dropEffect(item, display, setDisplay, setOverlay, setReservationList, currentDate, roomNumber),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
      hover: (item) => throttleHoverEffect(item, setOverlay),
    }),
    [reservationList, overlay, setReservationList, setOverlay]
  )

  const handleCreateReservation = () => {
    setIsDisplayCreateReservation(!isDisplayCreateReservation)
  }

  //달력이 걸치는 경우? checkIn부터 checkOut까지의 값을 모두 넣고 indexOf로 currentDate와 동일한게 있는지 찾는다
  let reservationDateArray = []

  if (reservation !== undefined) {
    reservationDateArray = getDateArray(reservation?.checkIn, reservation?.checkOut)
  }

  const data = {
    drop,
    drag,
    isDragging,
    isOver,
    price,
    reservation,
    lockedRoom,
    currentDate,
    overlay,
    dayCount,
    reservationDateArray,
    handleCreateReservation,
  }

  return <PricePresenter {...data} />
}
