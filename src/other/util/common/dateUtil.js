import { differenceInCalendarDays, parseISO } from 'date-fns'
import { addDays, formatWithOptions, toDate } from 'date-fns/fp'
import { ko } from 'date-fns/locale'

export const today = new Date()

//파라메터도 리턴도 yyyyMMdd다
/*
var monthValues = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  wide: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};
var dayValues = {
  narrow: ['일', '월', '화', '수', '목', '금', '토'],
  short: ['일', '월', '화', '수', '목', '금', '토'],
  abbreviated: ['일', '월', '화', '수', '목', '금', '토'],
  wide: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
};
var dateFormats = {
  full: 'y년 M월 d일 EEEE',
  long: 'y년 M월 d일',
  medium: 'y.MM.dd',
  short: 'y.MM.dd'
};
var timeFormats = {
  full: 'a H시 mm분 ss초 zzzz',
  long: 'a H:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
*/

const locale = { locale: ko }
export const formatyyyyMMdd = formatWithOptions(locale, 'yyyyMMdd')
export const formatMMddE = formatWithOptions(locale, 'MM.dd(E)')
export const formatddE = formatWithOptions(locale, 'dd.E')
export const formatyyyyMMddE = formatWithOptions(locale, 'yyyy.MM.dd(E)')

export const stringToDate = (yyyyMMdd) => toDate(parseISO(yyyyMMdd))
export const betweenyyyyMMdd = (yyyyMMddEarlier, yyyyMMddLater) =>
  differenceInCalendarDays(stringToDate(yyyyMMddLater), stringToDate(yyyyMMddEarlier))

export const addyyyyMMdd = (yyyyMMdd, days) => formatyyyyMMdd(addDays(days)(stringToDate(yyyyMMdd)))

//calendar
export const formatdd = formatWithOptions(locale, 'dd')
export const formatMMdd = formatWithOptions(locale, 'MMdd')
export const formatyyyyMM = formatWithOptions(locale, 'yyyy년 M월')

//요금관리-기간별요금관리
export const formatLong = formatWithOptions(locale, 'y년 M월 d일')
export const formatyyyyMMddWithHyphen = formatWithOptions(locale, 'yyyy-MM-dd')
export const formatMW = formatWithOptions(locale, 'MM월')
//etc
export const WithoutTime = (dateTime) => {
  var date = new Date(dateTime.getTime())
  date.setHours(0, 0, 0, 0)
  return date
}
