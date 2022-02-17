import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useRecoilValue } from 'recoil'
import ReservationOverlay from '../Overlay/ReservationOverlay'
import TargetOverlay from '../Overlay/TargetOverlay'
import SourceOverlay from '../Overlay/SourceOverlay'
import { addyyyyMMdd, betweenyyyyMMdd } from '../../../../other/util/common/dateUtil'
import { currentReservationAtom, dayCountAtom, isDisplayCreateReservationAtom, reservationListAtom } from '../../../../service/state/reservation/atom'
import { getReservationDateArray } from '../../../../other/util/reservation/reservation'

export default function Price({ price, currentDate, reservation, roomNumber }) {
  const [overlay, setOverlay] = useState({
    hoverColor: '',
    hoverData: '',
    hoverLength: '',
  })
  const ref = useRef()

  const dayCount = useRecoilValue(dayCountAtom)
  const [currentReservation, setCurrentReservation] = useRecoilState(currentReservationAtom)
  const [reservationList, setReservationList] = useRecoilState(reservationListAtom)
  const [isDisplayCreateReservation, setIsDisplayCreateReservation] = useRecoilState(isDisplayCreateReservationAtom)
  //const standardDate = useRecoilValue(standardDateAtom)

  //useDrag, useDrop
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'item',
      item: () => {
        const [reservation] = reservationList.filter((item) => item.checkIn === currentDate)
        if (reservation === undefined) {
          setOverlay({
            hoverColor: currentReservation.color,
            hoverData: currentReservation.data,
            hoverLength: betweenyyyyMMdd(currentReservation.checkIn, currentReservation.checkOut),
          })
          return currentReservation
        } else {
          setOverlay({
            hoverColor: reservation.color,
            hoverData: reservation.data,
            hoverLength: betweenyyyyMMdd(reservation.checkIn, reservation.checkOut),
          })
          setCurrentReservation(reservation)
          return reservation
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [currentReservation, reservationList, setCurrentReservation, reservation, currentDate]
  )
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'item',
      canDrop: (item) => {
        const checkIn = item.checkIn
        const checkOut = item.checkOut
        const location = item.location
        //1.예약 겹치지 않게하기
        const otherReservationIndexList = getOtherReservationIndexList(reservationList, checkIn, checkOut)
        console.log('otherReservationIndexList : ', otherReservationIndexList)
        if (otherReservationIndexList.indexOf({ checkIn: currentDate, location }) > -1) {
          return false
        }

        // //2.width 100%넘는 예약 넘치지 않게하기
        // const startDate = formatyyyyMMdd(standardDate)
        // const endDate = addyyyyMMdd(startDate, dayCount)
        // const reservationLength = betweenyyyyMMdd(checkIn, checkOut)
        // const canNotDropIndexList = getCanNotDropIndexList(startDate, endDate, reservationLength)
        // console.log('canNotDropIndexList : ', canNotDropIndexList)
        // if (canNotDropIndexList.indexOf(currentDate) > -1) {
        //   return false
        // }
        return true
      },
      drop: (item) => {
        const sourceReservation = item
        const sourcecheckIn = item.checkIn
        const sourcecheckOut = item.checkOut
        const sourceLocation = item.location
        const night = betweenyyyyMMdd(sourcecheckIn, sourcecheckOut)

        setOverlay({
          hoverColor: '',
          hoverData: '',
          hoverLength: '',
        })

        setReservationList((prevState) => {
          const filteredState = prevState.filter((reserv) => {
            return reserv.checkIn !== sourcecheckIn || reserv.location !== sourceLocation
            // const draggingReservation = { checkIn: sourcecheckIn, location: sourceLocation }
            // const OtherReservation = { checkIn: reserv.checkIn, location: reserv.location }
            // return draggingReservation !== OtherReservation
          })
          console.log('filteredState')
          console.log(filteredState)
          return [...filteredState, { ...sourceReservation, checkIn: currentDate, checkOut: addyyyyMMdd(currentDate, night), location: roomNumber }]
        })
        setCurrentReservation({ ...sourceReservation, checkIn: currentDate, checkOut: addyyyyMMdd(currentDate, night), location: roomNumber })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
      hover: (item, monitor) => {
        // if (!ref.current) {
        //   return
        // }
        // if (item !== undefined) {
        //   setCurrentReservation(item)
        // }
        setOverlay({
          hoverColor: item.color,
          hoverData: item.data,
          hoverLength: betweenyyyyMMdd(item.checkIn, item.checkOut),
        })
      },
    }),
    [currentReservation, reservationList, overlay, setReservationList, setCurrentReservation, setOverlay]
  )

  const getOtherReservationIndexList = (reservationList, sourceCheckIn, sourceCheckOut) => {
    const otherReservationIndexList = []
    const sourceLength = betweenyyyyMMdd(sourceCheckIn, sourceCheckOut)

    for (reservation of reservationList) {
      const checkIn = reservation.checkIn
      const checkOut = reservation.checkOut
      const location = reservation.location

      //드래그중인 예약 자신이 존재하는칸은 드래그할 수 있다
      if (checkIn === sourceCheckIn) {
        continue
      }

      //한칸짜리, 여러칸짜리 예약이 다른 예약과 겹칠 수 없도록 하기
      if (addyyyyMMdd(checkIn, 1) === checkOut) {
        otherReservationIndexList.push(checkIn)
      } else {
        for (let i = checkIn; i !== checkOut; i = addyyyyMMdd(i, 1)) {
          if (i === checkOut) {
            break
          }
          otherReservationIndexList.push({ checkIn: i, location })
        }
      }
      //드래그중인 예약의 길이가 1보다 클경우 다른예약과 겹칠 수 없도록 하기
      if (sourceLength > 1) {
        for (let i = checkIn; i !== addyyyyMMdd(checkIn, -sourceLength); i = addyyyyMMdd(i, -1)) {
          otherReservationIndexList.push({ checkIn: i, location })
        }
      }
    }
    return otherReservationIndexList
  }

  // const getCanNotDropIndexList = (startDate, endDate, reservationLength) => {
  //   const canNotDropIndexList = []
  //   const rowLength = betweenyyyyMMdd(startDate, endDate)

  //   let count = 0
  //   for (let i = rowLength; i > rowLength - (reservationLength - 1); i--) {
  //     count += 1
  //     canNotDropIndexList.push(addyyyyMMdd(endDate, -count))
  //   }

  //   return canNotDropIndexList
  // }

  const handleCreateReservation = () => {
    setIsDisplayCreateReservation(!isDisplayCreateReservation)
  }

  //checkIn부터 checkOut까지의 값을 모두 넣고 indexOf로 currentDate와 동일한게 있는지 찾는다
  let reservationDateArray = []

  if (reservation !== undefined) {
    reservationDateArray = getReservationDateArray(reservation?.checkIn, reservation?.checkOut)
  }

  return (
    <>
      <div ref={drop}>
        <div style={{ display: 'grid', position: 'relative', width: '100%', height: '100%' }}>
          <a href='/#' className={reservation?.checkIn === currentDate ? '' : 'none'} style={{ display: 'block', placeSelf: 'center' }} ref={ref} onClick={handleCreateReservation}>
            {`${price}만`}
          </a>

          {/* reservation */}
          {reservationDateArray?.indexOf(currentDate) > -1 && !isDragging && <ReservationOverlay data={reservation} drag={drag} dayCount={dayCount} currentDate={currentDate} />}
          {/* hover overlay */}
          {isOver && overlay.hoverColor !== '' && <TargetOverlay data={overlay} />}
          {/* source overlay */}
          {isDragging && overlay.hoverColor !== '' && <SourceOverlay data={overlay} />}
        </div>
      </div>
    </>
  )
}