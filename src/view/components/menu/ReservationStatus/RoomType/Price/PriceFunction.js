import _ from 'lodash'
import {
  addyyyyMMdd,
  betweenyyyyMMdd,
  formatyyyyMMdd,
  formatyyyyMMddWithHyphen,
  stringToDate,
  WithoutTime,
} from '@util/common/dateUtil'
import { getDateArray } from '@util/reservation/reservation'
import { makeReservationColor } from '../../Overlay/ReservationOverlay'
import { isBefore } from 'date-fns'
import { getFormDataFromJson } from '@util/common/axiosUtil'

export const itemEffect = (
  filteredReservationList,
  currentDate,
  standardDate,
  setOverlay,
  roomNumber,
  setDisplay
) => {
  let [reservation] = filteredReservationList.filter(
    (item) => item.checkinDate === formatyyyyMMddWithHyphen(stringToDate(currentDate))
  )

  //양쪽 달력에 걸칠때 드래그 할 수 있도록 하기
  reservation = getReservationWhenHangOverTwoCalendar(
    reservation,
    filteredReservationList,
    currentDate,
    standardDate,
    roomNumber
  )

  setDisplay((prev) => ({ ...prev, display: 'none' }))
  setOverlay({
    hoverColor: makeReservationColor(reservation.reserveStatus),
    hoverData: reservation.data,
    hoverLength: betweenyyyyMMdd(reservation.checkIn, reservation.checkOut),
  })
  return reservation
}

export const dropEffect = (
  item,
  setDisplay,
  setOverlay,
  setReservationList,
  currentDate,
  roomNumber,
  updateReservation,
  targetRmNo
) => {
  setDisplay((prev) => ({ ...prev, display: 'none' }))
  const sourceReservation = item
  const sourcecheckIn = item.checkinDate
  const sourcecheckOut = item.checkoutDate
  const sourceLocation = item.rmNo
  const sourceRrNo = item.rrNo
  const night = betweenyyyyMMdd(sourcecheckIn, sourcecheckOut)

  setOverlay({
    hoverColor: '',
    hoverData: '',
    hoverLength: '',
  })

  const rrNo = sourceRrNo
  const rmNo = targetRmNo
  const checkinDate = formatyyyyMMddWithHyphen(stringToDate(currentDate))
  const checkoutDate = formatyyyyMMddWithHyphen(stringToDate(addyyyyMMdd(currentDate, night)))

  if (sourcecheckIn === checkinDate && sourceLocation === rmNo) {
    return
  }
  const parameter = {
    rrNo,
    rmNo,
    checkinDate,
    checkoutDate,
  }
  updateReservation(getFormDataFromJson(parameter))

  // setReservationList((prevState) => {
  //   const filteredState = prevState.filter(
  //     (reserv) => reserv.checkIn !== sourcecheckIn || reserv.location !== sourceLocation
  //   )
  //   return [
  //     ...filteredState,
  //     {
  //       ...sourceReservation,
  //       checkIn: currentDate,
  //       checkOut: addyyyyMMdd(currentDate, night),
  //       location: roomNumber,
  //     },
  //   ]
  // })
}

export const canDropEffect = (
  item,
  filteredReservationList,
  lockedRoomList,
  lockedRoom,
  currentDate,
  rmNo,
  price
) => {
  const reservationStatus = item.reserveStatus
  const checkIn = item.checkinDate
  const checkOut = item.checkoutDate
  const location = item.rmNo
  const isLockedRoom = lockedRoom !== undefined
  return getIsCanNotDrop(
    filteredReservationList,
    lockedRoomList,
    isLockedRoom,
    checkIn,
    checkOut,
    location,
    currentDate,
    rmNo,
    reservationStatus,
    price
  )
}

export const throttleHoverEffect = _.throttle((item, setOverlay) => {
  setOverlay({
    hoverColor: item.color,
    hoverData: item.data,
    hoverLength: betweenyyyyMMdd(item.checkIn, item.checkOut),
  })
}, 500)

export const getReservationWhenHangOverTwoCalendar = (
  reservation,
  filteredReservationList,
  currentDate,
  standardDate,
  roomNumber
) => {
  if (reservation === undefined && currentDate === formatyyyyMMdd(standardDate)) {
    //찾는방법 동일한 roomNumber내에서 모든 checkIn과 checkOut 중에서 해당 버튼에 해당되는곳을 찾는다

    //currentDate가 포함되는것 하나 찾기
    for (let i = 0; i < filteredReservationList.length; i++) {
      const reservationDateArray = getDateArray(
        filteredReservationList[i].checkIn,
        filteredReservationList[i].checkOut
      )
      if (reservationDateArray.indexOf(currentDate) > -1) {
        return filteredReservationList[i]
      }
    }
  }
  return reservation
}

const getIsCanNotDrop = (
  filteredReservationList,
  lockedRoomList,
  isLockedRoom,
  sourceCheckIn,
  sourceCheckOut,
  sourceLocation,
  targetDate,
  rmNo,
  reservationStatus,
  price
) => {
  //0.RESERVECOMPLETE가 아니면 이동 불가능
  if (reservationStatus !== 'RESERVECOMPLETE') {
    return false
  }
  //1.오늘날짜 0시 이전의 예약은 이동 불가능
  const today = WithoutTime(new Date())
  const isSourceReservationBeforeToday = isBefore(stringToDate(sourceCheckIn), today)
  if (isSourceReservationBeforeToday) {
    return false
  }
  //2.오늘날짜 0시 이전으로는 예약이동 불가능
  const isTargetRoomBeforeToday = isBefore(stringToDate(targetDate), today)
  if (isTargetRoomBeforeToday) {
    return false
  }
  //3.가격이 없는 방은 예약 불가능
  const isDontHavePriceRoom = isNaN(price)
  if (isDontHavePriceRoom) {
    return false
  }

  //4.대상이 잠긴방일경우 false 리턴
  if (isLockedRoom) {
    return false
  }

  //5.서로다른 예약끼리 겹치지 않게하기
  const otherReservationIndexList = getOtherReservationIndexList(
    filteredReservationList,
    sourceCheckIn,
    sourceCheckOut,
    sourceLocation
  )
  for (let i = 0; i < otherReservationIndexList.length; i++) {
    const otherReservation = otherReservationIndexList[i]
    //예약의 체크인 === 드래그중인 예약이 아니라(x) 드래그목적지의 날짜 currentDate
    //예약의 방이름 === 드래그중인 예약이 아니라(x) 드래그목적지의 방번호 rmNo
    if (
      otherReservation.checkIn === formatyyyyMMddWithHyphen(stringToDate(targetDate)) &&
      otherReservation.location === rmNo
    ) {
      return false
    }
  }

  // //6.잠긴방에 예약을 드래그할 수 없게하기
  // const canNotDropIndexList = getCanNotDropIndexList(
  //   lockedRoomList,
  //   sourceCheckIn,
  //   sourceCheckOut,
  //   sourceLocation
  // )
  // // console.log('canNotDropIndexList : ', canNotDropIndexList)
  // for (let i = 0; i < canNotDropIndexList.length; i++) {
  //   const canNotDropIndex = canNotDropIndexList[i]
  //   if (canNotDropIndex.targetDate === currentDate && canNotDropIndex.location === roomNumber) {
  //     return false
  //   }
  // }
  return true
}

const getOtherReservationIndexList = (
  reservationList,
  sourceCheckIn,
  sourceCheckOut,
  sourceLocation
) => {
  const otherReservationIndexList = []
  const sourceLength = betweenyyyyMMdd(sourceCheckIn, sourceCheckOut)

  for (let reservation of reservationList) {
    const checkIn = reservation.checkinDate
    const checkOut = reservation.checkoutDate
    const location = reservation.rmNo

    //드래그중인 예약 자신이 존재하는칸은 드래그할 수 있다
    if (checkIn === sourceCheckIn && location === sourceLocation) {
      continue
    }

    //한칸짜리, 여러칸짜리 예약이 다른 예약과 겹칠 수 없도록 하기
    if (formatyyyyMMddWithHyphen(stringToDate(addyyyyMMdd(checkIn, 1))) === checkOut) {
      otherReservationIndexList.push({ checkIn, location })
    } else {
      for (
        let i = checkIn;
        i !== checkOut;
        i = formatyyyyMMddWithHyphen(stringToDate(addyyyyMMdd(i, 1)))
      ) {
        // if (i === checkOut) {
        //   break
        // }
        otherReservationIndexList.push({ checkIn: i, location })
      }
    }
    //드래그중인 예약의 길이가 1보다 클경우 다른예약과 겹칠 수 없도록 하기
    if (sourceLength > 1) {
      for (
        let i = checkIn;
        i !== formatyyyyMMddWithHyphen(stringToDate(addyyyyMMdd(checkIn, -sourceLength)));
        i = formatyyyyMMddWithHyphen(stringToDate(addyyyyMMdd(i, -1)))
      ) {
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
      for (
        let i = targetDate;
        i !== addyyyyMMdd(targetDate, -sourceLength);
        i = addyyyyMMdd(i, -1)
      ) {
        canNotDropIndexList.push({ targetDate: i, location })
      }
    }
  }
  return canNotDropIndexList
}
