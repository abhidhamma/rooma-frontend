import { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentReservationAtom, dayCountAtom, displayAtom, isDisplayCreateReservationAtom, reservationListAtom, roomTypeListAtom } from '../../../data/state'
import ReservationOverlay from '../Overlay/ReservationOverlay'
import TargetOverlay from '../Overlay/TargetOverlay'
import SourceOverlay from '../Overlay/SourceOverlay'
import CreateReservation from '../CreateReservation'

export default function Price({ price, targetIndex, reservation, date }) {
  const [overlay, setOverlay] = useState({
    hoverColor: '',
    hoverData: '',
    hoverLength: '',
  })
  const ref = useRef()

  const dayCount = useRecoilValue(dayCountAtom)
  const [currentReservation, setCurrentReservation] = useRecoilState(currentReservationAtom)
  const [reservationList, setReservationList] = useRecoilState(reservationListAtom)
  const [roomTypeList, setRoomTypeList] = useRecoilState(roomTypeListAtom)
  const [isDisplayCreateReservation, setIsDisplayCreateReservation] = useRecoilState(isDisplayCreateReservationAtom)

  //useDrag, useDrop
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'item',
      item: () => {
        if (reservation === undefined) {
          return currentReservation
        } else {
          setCurrentReservation(reservation)
          return reservation
        }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [currentReservation, reservationList]
  )
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'item',
      canDrop: (item, monitor) => {
        const startIndex = item.startIndex
        const endIndex = item.endIndex

        //1.예약 겹치지 않게하기
        const otherReservationIndexList = getOtherReservationIndexList(reservationList, startIndex, endIndex)
        //console.log('otherReservationIndexList : ', otherReservationIndexList)

        if (otherReservationIndexList.indexOf(targetIndex) > -1) {
          return false
        }

        //2.width 100%넘는 예약 넘치지 않게하기
        let itemListLength = 0

        const roomTypeListLength = roomTypeList.length

        const lastRoomType = roomTypeList[roomTypeListLength - 1]

        const monthPriceList = lastRoomType.monthPriceList
        const monthPriceListLength = monthPriceList.length

        const lastPriceList = monthPriceList[monthPriceListLength - 1]
        const lastPriceListLength = lastPriceList.length
        const lastIndexId = lastPriceList[lastPriceListLength - 1].id

        itemListLength = lastIndexId + 1

        const rowLength = 30
        const reservationLength = endIndex - startIndex + 1

        const canNotDropIndexList = getCanNotDropIndexList(itemListLength, rowLength, reservationLength)
        //console.log('canNotDropIndexList : ', canNotDropIndexList)
        if (canNotDropIndexList.indexOf(targetIndex) > -1) {
          return false
        }

        return true
      },
      drop: (item) => {
        const sourceReservation = item
        const sourceStartIndex = item.startIndex
        const sourceEndIndex = item.endIndex
        const gap = sourceEndIndex - sourceStartIndex

        setReservationList((prevState) => {
          const filteredState = prevState.filter((reserv) => reserv.startIndex !== sourceStartIndex)
          return [...filteredState, { ...sourceReservation, startIndex: targetIndex, endIndex: targetIndex + gap }]
        })
        setCurrentReservation({ ...sourceReservation, startIndex: targetIndex, endIndex: targetIndex + gap })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
      hover: (item, monitor) => {
        if (!ref.current) {
          return
        }
        if (item !== undefined) {
          setCurrentReservation(item)
        }

        setOverlay({
          hoverColor: item.color,
          hoverData: item.data,
          hoverLength: item.endIndex - item.startIndex + 1,
        })
      },
    }),
    [currentReservation, reservationList]
  )

  const getOtherReservationIndexList = (reservationList, sourceStartIndex, sourceEndIndex) => {
    const otherReservationIndexList = []
    const sourceLength = sourceEndIndex - sourceStartIndex + 1

    for (reservation of reservationList) {
      const startIndex = reservation.startIndex
      const endIndex = reservation.endIndex

      //드래그중인 예약 자신이 존재하는칸은 드래그할 수 있다
      if (startIndex === sourceStartIndex) {
        continue
      }

      //한칸짜리, 여러칸짜리 다른 예약과 겹칠 수 없도록 하기
      if (startIndex === endIndex) {
        otherReservationIndexList.push(startIndex)
      } else {
        for (let i = startIndex; i <= endIndex; i++) {
          otherReservationIndexList.push(i)
        }
      }
      //드래그중인 예약의 길이가 1보다 클경우 다른예약과 겹칠 수 없도록 하기
      if (sourceLength > 1) {
        for (let i = startIndex; i > startIndex - sourceLength; i--) {
          if (i < 0) {
            break
          }
          otherReservationIndexList.push(i)
        }
      }
    }
    return otherReservationIndexList
  }

  const getCanNotDropIndexList = (itemListLength, rowLength, reservationLength) => {
    const canNotDropIndexList = []
    const itemListLengthToIndex = itemListLength - 1 //30-1 = 29
    const reservationLengthToIndex = reservationLength - 1 // 3-1 = 2

    for (let i = itemListLengthToIndex; i > 0; i = i - rowLength) {
      for (let j = i; j > i - reservationLengthToIndex; j--) {
        canNotDropIndexList.push(j)
      }
    }

    return canNotDropIndexList
  }

  const handleCreateReservation = () => {
    setIsDisplayCreateReservation(!isDisplayCreateReservation)
  }
  return (
    <>
      <div ref={drop}>
        <div style={{ display: 'grid', position: 'relative', width: '100%', height: '100%' }}>
          <a href='/#' className='none' style={{ display: 'block', placeSelf: 'center' }} ref={ref} onClick={handleCreateReservation}>
            {`${price}만`}
          </a>

          {/* reservation */}
          {reservation?.startIndex === targetIndex && !isDragging && <ReservationOverlay data={reservation} drag={drag} date={date} />}
          {/* hover overlay */}
          {isOver && <TargetOverlay data={overlay} />}
          {/* source overlay */}
          {isDragging && <SourceOverlay data={overlay} />}
        </div>
      </div>
    </>
  )
}
