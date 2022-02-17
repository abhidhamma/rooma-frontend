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
        let [reservation] = reservationList.filter((item) => item.checkIn === currentDate)

        if (reservation === undefined) {
          //찾는방법 동일한 roomNumber내에서 모든 checkIn과 checkOut 중에서 해당 버튼에 해당되는곳을 찾는다

          //1.roomNumber로 필터
          const filterRoomNumber = reservationList.filter((item) => item.location === roomNumber)

          //2.currentDate가 포함되는것 하나 찾기
          for (let i = 0; i < filterRoomNumber.length; i++) {
            const reservationDateArray = getReservationDateArray(filterRoomNumber[i].checkIn, filterRoomNumber[i].checkOut)
            if (reservationDateArray.indexOf(currentDate) > -1) {
              reservation = filterRoomNumber[i]
            }
          }
        }
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
        const otherReservationIndexList = getOtherReservationIndexList(reservationList, checkIn, checkOut, location)
        console.log('otherReservationIndexList : ', otherReservationIndexList)
        for (let i = 0; i < otherReservationIndexList.length; i++) {
          const reservation = otherReservationIndexList[i]
          //예약의 체크인 === 드래그중인 예약이 아니라(x) 드래그되고있는 위치의 날짜 currentDate
          //예약의 방이름 === 드래그중인 예약이 아니라(x) 드래그되고있는 위치의 방이름 currentDate
          if (reservation.checkIn === currentDate && reservation.location === roomNumber) {
            console.log(reservation.checkIn)
            console.log(currentDate)
            console.log(reservation.location)
            console.log(location)
            console.log('false!!')
            return false
          }
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
        console.log('drop')
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
          const filteredState = prevState.filter((reserv) => reserv.checkIn !== sourcecheckIn || reserv.location !== sourceLocation)
          // const filteredState = []
          // for (let i = 0; i < prevState.length; i++) {
          //   const checkIn = prevState[i].checkIn
          //   const location = prevState[i].location
          //   if (checkIn === sourcecheckIn && location === sourceLocation) {
          //     continue
          //   }
          //   filteredState.push(prevState[i])
          //}

          return [...filteredState, { ...sourceReservation, checkIn: currentDate, checkOut: addyyyyMMdd(currentDate, night), location: roomNumber }]
        })
        //setCurrentReservation({ ...sourceReservation, checkIn: currentDate, checkOut: addyyyyMMdd(currentDate, night), location: roomNumber })
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

  const getOtherReservationIndexList = (reservationList, sourceCheckIn, sourceCheckOut, sourceLocation) => {
    const otherReservationIndexList = []
    const sourceLength = betweenyyyyMMdd(sourceCheckIn, sourceCheckOut)

    console.log(reservationList)
    for (reservation of reservationList) {
      const name = reservation.data
      const checkIn = reservation.checkIn
      const checkOut = reservation.checkOut
      const location = reservation.location

      //드래그중인 예약 자신이 존재하는칸은 드래그할 수 있다
      if (checkIn === sourceCheckIn && location === sourceLocation) {
        continue
      }

      //한칸짜리, 여러칸짜리 예약이 다른 예약과 겹칠 수 없도록 하기
      if (addyyyyMMdd(checkIn, 1) === checkOut) {
        otherReservationIndexList.push({ checkIn, location, name })
      } else {
        for (let i = checkIn; i !== checkOut; i = addyyyyMMdd(i, 1)) {
          // if (i === checkOut) {
          //   break
          // }
          otherReservationIndexList.push({ checkIn: i, location, name })
        }
      }
      //드래그중인 예약의 길이가 1보다 클경우 다른예약과 겹칠 수 없도록 하기
      if (sourceLength > 1) {
        for (let i = checkIn; i !== addyyyyMMdd(checkIn, -sourceLength); i = addyyyyMMdd(i, -1)) {
          otherReservationIndexList.push({ checkIn: i, location, name })
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
