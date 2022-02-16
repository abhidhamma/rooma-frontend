import { toDate } from 'date-fns'
import { addDays } from 'date-fns/fp'
import { atom } from 'recoil'
import { formatyyyyMMdd, stringToDate } from '../other/util/dateUtil'
import makeDummyData from './makeDummyData'

export const renderCountAtom = atom({
  key: 'renderCountAtom',
  default: 0,
})
export const roomTypeListAtom = atom({
  key: 'roomTypeListAtom',
  default: makeDummyData(1),
})
export const currentReservationAtom = atom({
  key: 'currentReservationAtom',
  default: { startIndex: null, endIndex: null, color: null, data: null },
})

const fromToday = (i) => formatyyyyMMdd(addDays(i)(new Date()))
export const reservationListAtom = atom({
  key: 'reservationListAtom',
  default: [
    { checkIn: fromToday(0), checkOut: fromToday(1), color: '#34C38F', data: '김길동', location: '101호' },
    { checkIn: fromToday(1), checkOut: fromToday(3), color: '#5B73E8', data: '한길동', location: '102호' },
    { checkIn: fromToday(8), checkOut: fromToday(9), color: '#F46A6A', data: '박길동', location: '101호' },
    { checkIn: fromToday(41), checkOut: fromToday(42), color: '#F1B44C', data: '송길동', location: '102호' },
    { checkIn: fromToday(51), checkOut: fromToday(55), color: '#50A5F1', data: '하길동', location: '101호' },
    // { startIndex: 90, endIndex: 90, color: '#34C38F', data: '김길동' },
    // { startIndex: 91, endIndex: 93, color: '#5B73E8', data: '한길동' },
    // { startIndex: 118, endIndex: 119, color: '#F46A6A', data: '박길동' },
    // { startIndex: 131, endIndex: 132, color: '#F1B44C', data: '송길동' },
    // { startIndex: 141, endIndex: 145, color: '#50A5F1', data: '하길동' },
  ],
})
export const displayAtom = atom({
  key: 'displayAtom',
  default: {
    display: 'none',
    name: '홍길동',
  },
})
export const isDisplayCreateReservationAtom = atom({
  key: 'isDisplayCreateReservationAtom',
  default: false,
})
export const dayCountAtom = atom({
  key: 'dayCountAtom',
  default: 30,
})
export const standardDateAtom = atom({
  key: 'standardDateAtom',
  default: new Date(),
})
