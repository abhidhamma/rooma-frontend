import {
  addyyyyMMdd,
  formatyyyyMMdd,
  betweenyyyyMMdd,
  stringToDate,
  formatyyyyMMddWithHyphen,
} from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { getDateArray } from '@util/reservation/reservation'
import { addDays } from 'date-fns'
import _ from 'lodash/fp'

//현재 보일 캘린더의 날짜별 가격 목록
export const getCurrentMonthPrice = (monthPriceList, standardDate, dayCount) => {
  const firstIndex = monthPriceList.findIndex(
    (day) => formatyyyyMMdd(stringToDate(day.targetDate)) === formatyyyyMMdd(standardDate)
  )

  const lastIndex = firstIndex + (dayCount - 1)
  return monthPriceList.slice(firstIndex, lastIndex + 1)
}

//현재 보일 캘린더의 기간동안 각 호실별로 포함될 예약 목록
export const getCurrentReservationList = (reservationList, standardDate, dayCount, roomNumber) => {
  //이 달력뒤에 예약이 있을 수 있으므로 겹치지 않도록
  //reservation을 찾는 범위를 현재달력의 가장 긴 예약만큼 더 준다
  const filteredReservationList = reservationList
    .filter((reservation) => reservation.location === roomNumber)
    .map((reservation) => betweenyyyyMMdd(reservation.checkIn, reservation.checkOut))
  const longestLength =
    filteredReservationList.length === 0
      ? 0
      : filteredReservationList.reduce((prev, current) => Math.max(prev, current))
  const currentyyyyMMdd = formatyyyyMMdd(standardDate)
  const endyyyyMMdd = addyyyyMMdd(currentyyyyMMdd, dayCount + longestLength)
  const currentCalendarDateArray = getDateArray(currentyyyyMMdd, endyyyyMMdd)

  return reservationList.filter((reservation) => {
    if (reservation.location !== roomNumber) {
      return false
    }
    const reservationDateArray = getDateArray(reservation.checkIn, reservation.checkOut)
    for (let i = 0; i < reservationDateArray.length; i++) {
      const reservationDate = reservationDateArray[i]
      if (currentCalendarDateArray.indexOf(reservationDate) > -1) {
        return true
      }
    }
    return false
  })
}

export const getCurrentLockedRoomList = (lockedRoomList, standardDate, dayCount, roomNumber) => {
  const currentyyyyMMdd = formatyyyyMMdd(standardDate)
  const endyyyyMMdd = addyyyyMMdd(currentyyyyMMdd, dayCount)
  const currentCalendarDateArray = getDateArray(currentyyyyMMdd, endyyyyMMdd)
  return lockedRoomList.filter((lockedRoom) => {
    if (lockedRoom.location !== roomNumber) {
      return false
    }
    if (currentCalendarDateArray.indexOf(lockedRoom.targetDate) > -1) {
      return true
    }
    return false
  })
}

//표시될 예약이 있는경우 가격 리스트에 포함시키기
export const getCurrentCalendar = (
  currentMonthPriceList,
  currentReservationList,
  currentLockedRoomList,
  standardDate
) => {
  // 변경하자 30일 날짜가 있고 거기에 price, reservation, lock을 차례대로 담는식으로 하자
  // 보여질 30일치 날짜 만들기
  // const displayDays = 30
  // const mapDate = _.map((number) => ({
  //   targetDate: formatyyyyMMddWithHyphen(addDays(standardDate, number - 1)),
  // }))
  // const dummyMonthData = _.flow(numberToArray, mapDate)(displayDays)

  // const addMonthPriceList = _.map((targetDate) => {
  //   const findCurrentDateData = _.find(
  //     (monthPrice) => monthPrice.targetDate === formatyyyyMMddWithHyphen(targetDate)
  //   )
  //   const currentDateData = findCurrentDateData(monthPriceList)
  //   return {}
  // })
  // console.log(dummyMonthData)

  let priceList = currentMonthPriceList
  for (let i = 0; i < priceList.length; i++) {
    const priceDate = formatyyyyMMdd(stringToDate(priceList[i].targetDate))
    for (let j = 0; j < currentReservationList.length; j++) {
      const reservation = currentReservationList[j]
      const checkIn = formatyyyyMMdd(stringToDate(reservation.checkinDate))

      //reservation 포함시키기
      if (priceDate === checkIn) {
        priceList[i] = { ...priceList[i], reservation, targetDate: priceDate }
        continue
      }
      let isHangOnTwoCalendar = getIsHangOnTwoCalendar(reservation, standardDate, priceDate)
      if (isHangOnTwoCalendar) {
        priceList[i] = { ...priceList[i], reservation, targetDate: priceDate }
      }
    }

    for (let k = 0; k < currentLockedRoomList.length; k++) {
      const lockedRoom = currentLockedRoomList[k]
      const targetDate = lockedRoom.lockDate

      if (priceDate === formatyyyyMMdd(stringToDate(targetDate))) {
        priceList[i] = { ...priceList[i], lockedRoom }
      }
    }
  }
  return priceList
}

//달력의 시작과 끝에 걸쳐있는 예약인지 체크
const getIsHangOnTwoCalendar = (reservation, standardDate, currentDate) => {
  let reservationDateArray = []
  reservationDateArray = getDateArray(reservation.checkIn, reservation.checkOut)

  const startDate = formatyyyyMMdd(standardDate)
  const prevEndDate = addyyyyMMdd(startDate, -1)

  //걸쳐있는 예약인지 확인하려면 지금달력의 시작날짜, 이전달력의 끝날짜 모두에 포함되어있는지 확인하면 된다
  return (
    reservationDateArray.indexOf(startDate) > -1 &&
    reservationDateArray.indexOf(prevEndDate) > -1 &&
    currentDate === formatyyyyMMdd(standardDate)
  )
}
