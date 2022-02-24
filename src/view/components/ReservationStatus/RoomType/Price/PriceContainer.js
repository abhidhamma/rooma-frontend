import { useDrag, useDrop } from 'react-dnd'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getDateArray } from '../../../../../other/util/reservation/reservation'
import { dayCountAtom, displayAtom, isDisplayCreateReservationAtom, lockedRoomListAtom, overlayAtom, reservationListAtom, standardDateAtom } from '../../../../../service/state/reservation/atom'
import { dropEffect, itemEffect, throttleCanDropEffect, throttleHoverEffect } from './PriceFunction'
import PricePresenter from './PricePresenter'

export default function PriceContainer({ price, currentDate, roomNumber, reservation, lockedRoom, currentReservationList }) {
  const dayCount = useRecoilValue(dayCountAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const lockedRoomList = useRecoilValue(lockedRoomListAtom)
  const setDisplay = useSetRecoilState(displayAtom)
  const setOverlay = useSetRecoilState(overlayAtom)
  const setReservationList = useSetRecoilState(reservationListAtom)
  const setIsDisplayCreateReservation = useSetRecoilState(isDisplayCreateReservationAtom)

  //useDrag, useDrop
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'item',
      item: () => itemEffect(currentReservationList, currentDate, standardDate, setOverlay, roomNumber, setDisplay),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [currentReservationList, currentDate, standardDate, setOverlay, roomNumber, setDisplay]
  )
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      canDrop: (item) => throttleCanDropEffect(item, currentReservationList, lockedRoomList, lockedRoom, currentDate, roomNumber),
      drop: (item) => dropEffect(item, setDisplay, setOverlay, setReservationList, currentDate, roomNumber),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
      hover: (item) => throttleHoverEffect(item, setOverlay),
    }),
    [currentReservationList, lockedRoomList, lockedRoom, currentDate, roomNumber]
  )

  const handleCreateReservation = () => {
    setIsDisplayCreateReservation((prev) => !prev)
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
    dayCount,
    reservationDateArray,
    handleCreateReservation,
  }

  return <PricePresenter {...data} />
}
