import { differenceInCalendarDays, parseISO } from 'date-fns'
import { addDays, formatWithOptions, toDate } from 'date-fns/fp'
import { ko } from 'date-fns/locale'

export const today = new Date()

//파라메터도 리턴도 yyyymmdd다
/*
toDate - 받은 string 인자를 Date객체로 변경해준다
*/

const locale = { locale: ko }
export const formatyyyyMMdd = formatWithOptions(locale, 'yyyyMMdd')
export const formatMMddE = formatWithOptions(locale, 'MM.dd(E)')
export const formatddE = formatWithOptions(locale, 'dd.E')
export const formatyyyyMMddE = formatWithOptions(locale, 'yyyy.MM.dd(E)')

export const stringToDate = (yyyyMMdd) => toDate(parseISO(yyyyMMdd))
export const betweenyyyyMMdd = (yyyyMMddEarlier, yyyyMMddLater) => differenceInCalendarDays(stringToDate(yyyyMMddLater), stringToDate(yyyyMMddEarlier))

export const addyyyyMMdd = (yyyymmdd, days) => formatyyyyMMdd(addDays(days)(stringToDate(yyyymmdd)))
