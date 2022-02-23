import _ from 'lodash'
import { addyyyyMMdd, betweenyyyyMMdd, formatyyyyMMdd } from '../../../../../other/util/common/dateUtil'
import { getDateArray } from '../../../../../other/util/reservation/reservation'

export const itemEffect = (filteredReservationList, currentDate, standardDate, setOverlay, roomNumber) => {
  let [reservation] = filteredReservationList.filter((item) => item.checkIn === currentDate)

  //양쪽 달력에 걸칠때 드래그 할 수 있도록 하기
  reservation = getReservationWhenHangOverTwoCalendar(reservation, filteredReservationList, currentDate, standardDate, roomNumber)

  console.log('item')
  console.log(reservation)
  setOverlay({
    hoverColor: reservation.color,
    hoverData: reservation.data,
    hoverLength: betweenyyyyMMdd(reservation.checkIn, reservation.checkOut),
  })
  return reservation
}

export const dropEffect = (item, display, setDisplay, setOverlay, setReservationList, currentDate, roomNumber) => {
  setDisplay({ ...display, display: 'none' })
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
    return [...filteredState, { ...sourceReservation, checkIn: currentDate, checkOut: addyyyyMMdd(currentDate, night), location: roomNumber }]
  })
}

export const throttleCanDropEffect = _.throttle((item, reservationList, lockedRoomList, currentDate, roomNumber) => {
  const checkIn = item.checkIn
  const checkOut = item.checkOut
  const location = item.location
  return getIsCanNotDrop(reservationList, lockedRoomList, checkIn, checkOut, location, currentDate, roomNumber)
}, 200)

export const throttleHoverEffect = _.throttle((item, setOverlay) => {
  console.log('hover')
  console.log(item)
  setOverlay({
    hoverColor: item.color,
    hoverData: item.data,
    hoverLength: betweenyyyyMMdd(item.checkIn, item.checkOut),
  })
}, 200)

export const getReservationWhenHangOverTwoCalendar = (reservation, filteredReservationList, currentDate, standardDate, roomNumber) => {
  if (reservation === undefined && currentDate === formatyyyyMMdd(standardDate)) {
    //찾는방법 동일한 roomNumber내에서 모든 checkIn과 checkOut 중에서 해당 버튼에 해당되는곳을 찾는다

    //currentDate가 포함되는것 하나 찾기
    for (let i = 0; i < filteredReservationList.length; i++) {
      const reservationDateArray = getDateArray(filteredReservationList[i].checkIn, filteredReservationList[i].checkOut)
      if (reservationDateArray.indexOf(currentDate) > -1) {
        return filteredReservationList[i]
      }
    }
  }
  return reservation
}

const getIsCanNotDrop = (reservationList, lockedRoomList, sourceCheckIn, sourceCheckOut, sourceLocation, currentDate, roomNumber) => {
  //1.서로다른 예약끼리 겹치지 않게하기
  const otherReservationIndexList = getOtherReservationIndexList(reservationList, sourceCheckIn, sourceCheckOut, sourceLocation)
  // console.log('otherReservationIndexList : ', otherReservationIndexList)
  for (let i = 0; i < otherReservationIndexList.length; i++) {
    const otherReservation = otherReservationIndexList[i]
    //예약의 체크인 === 드래그중인 예약이 아니라(x) 드래그되고있는 위치의 날짜 currentDate
    //예약의 방이름 === 드래그중인 예약이 아니라(x) 드래그되고있는 위치의 방이름 roomNumber
    if (otherReservation.checkIn === currentDate && otherReservation.location === roomNumber) {
      return false
    }
  }

  //2.잠긴방에 예약을 드래그할 수 없게하기
  const canNotDropIndexList = getCanNotDropIndexList(lockedRoomList, sourceCheckIn, sourceCheckOut, sourceLocation)
  // console.log('canNotDropIndexList : ', canNotDropIndexList)
  for (let i = 0; i < canNotDropIndexList.length; i++) {
    const canNotDropIndex = canNotDropIndexList[i]
    if (canNotDropIndex.targetDate === currentDate && canNotDropIndex.location === roomNumber) {
      return false
    }
  }
  return true
}

const getOtherReservationIndexList = (reservationList, sourceCheckIn, sourceCheckOut, sourceLocation) => {
  const otherReservationIndexList = []
  const sourceLength = betweenyyyyMMdd(sourceCheckIn, sourceCheckOut)

  for (let reservation of reservationList) {
    const checkIn = reservation.checkIn
    const checkOut = reservation.checkOut
    const location = reservation.location

    //드래그중인 예약 자신이 존재하는칸은 드래그할 수 있다
    if (checkIn === sourceCheckIn && location === sourceLocation) {
      continue
    }

    //한칸짜리, 여러칸짜리 예약이 다른 예약과 겹칠 수 없도록 하기
    if (addyyyyMMdd(checkIn, 1) === checkOut) {
      otherReservationIndexList.push({ checkIn, location })
    } else {
      for (let i = checkIn; i !== checkOut; i = addyyyyMMdd(i, 1)) {
        // if (i === checkOut) {
        //   break
        // }
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

const getCanNotDropIndexList = (lockedRoomList, sourceCheckIn, sourceCheckOut) => {
  const canNotDropIndexList = []
  const sourceLength = betweenyyyyMMdd(sourceCheckIn, sourceCheckOut)

  //잠긴객실은 드래그 할 수 없도록 하기
  for (let i = 0; i < lockedRoomList.length; i++) {
    const targetDate = lockedRoomList[i].targetDate
    const location = lockedRoomList[i].location
    canNotDropIndexList.push({ targetDate, location })

    //드래그중인 예약의 길이가 1보다 클경우 다른예약과 겹칠 수 없도록 하기
    if (sourceLength > 1) {
      for (let i = targetDate; i !== addyyyyMMdd(targetDate, -sourceLength); i = addyyyyMMdd(i, -1)) {
        canNotDropIndexList.push({ targetDate: i, location })
      }
    }
  }
  return canNotDropIndexList
}
