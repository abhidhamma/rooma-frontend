import { addDays, isSaturday, isSunday } from 'date-fns/fp'
import { addyyyyMMdd, formatddE, formatyyyyMMdd } from '../common/dateUtil'

/*
위치 : RoomReservation, Price, ReservationOverlay
설명 : 두 날짜를 받아서 첫번째 날짜에서 두번째날짜 이전일까지를 담은 array를 리턴한다
매개변수 : startDate, endDate
*/
export const getDateArray = (startDate, endDate) => {
  if (startDate === undefined || endDate === undefined) {
    return []
  }

  const reservationDateArray = []

  for (let i = startDate; i !== endDate; i = addyyyyMMdd(i, 1)) {
    reservationDateArray.push(i)
  }

  return reservationDateArray
}

/* 
위치 : ReservationSchedulerHeader
설명 : ReservationSchedulerHeader(예약달력)의 날짜를 만드는 함수
매개변수 : 매개변수 standardDate(기준일), dayCount(n일보기), today(현재날짜의 Date객체)
*/
export const getReservationSchedulerDateArray = (standardDate, dayCount, today) => {
  const reservationSchedulerDateArray = []
  for (let i = 0; i < dayCount; i++) {
    const addDay = addDays(i)
    const currentDate = addDay(standardDate)
    const currentDateIsToday = formatyyyyMMdd(currentDate) === formatyyyyMMdd(today)
    const currentDateIsSaturday = isSaturday(currentDate)
    const currentDateIsSunday = isSunday(currentDate)
    const ddE = formatddE(currentDate).split('.')
    const dd = ddE[0]
    const E = ddE[1]
    reservationSchedulerDateArray.push({ day: dd, dayOfWeek: E, isToday: currentDateIsToday, isSaturday: currentDateIsSaturday, isSunday: currentDateIsSunday })
  }
  return reservationSchedulerDateArray
}
