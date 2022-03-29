import { atom } from 'recoil'
import makeDummyData from '@api/makeDummyData'
import { formatyyyyMMdd } from '@util/common/dateUtil'
import { addDays } from 'date-fns/fp'
import {
  CURRENT_RESERVATION_ATOM_KEY,
  DAY_COUNT_ATOM_KEY,
  DISPLAY_ATOM_KEY,
  IS_DISPLAY_CREATE_RESERVATION_ATOM_KEY,
  IS_DISPLAY_READ_RESERVATION_ATOM_KEY,
  LOCKED_ROOM_LIST_ATOM_KEY,
  OVERLAY_ATOM_KEY,
  RESERVATION_LIST_ATOM_KEY,
  ROOMTYPE_LIST_ATOM_KEY,
  STANDARD_DATE_ATOM_KEY,
} from '@constant/atomKeys'

//객실가격의 더미데이터를 저장하는 atom
export const roomTypeListAtom = atom({
  key: ROOMTYPE_LIST_ATOM_KEY,
  default: makeDummyData(10),
})

//예약자정보의 더미데이터를 저장하는 atom
const fromToday = (i) => formatyyyyMMdd(addDays(i)(new Date()))
export const reservationListAtom = atom({
  key: RESERVATION_LIST_ATOM_KEY,
  default: [
    {
      checkIn: fromToday(6),
      checkOut: fromToday(7),
      color: '#34C38F',
      data: '김길동',
      location: '2호',
    },
    {
      checkIn: fromToday(1),
      checkOut: fromToday(3),
      color: '#5B73E8',
      data: '한길동',
      location: '2호',
    },
    {
      checkIn: fromToday(8),
      checkOut: fromToday(9),
      color: '#F46A6A',
      data: '박길동',
      location: '1호',
    },
    {
      checkIn: fromToday(41),
      checkOut: fromToday(42),
      color: '#F1B44C',
      data: '송길동',
      location: '2호',
    },
    {
      checkIn: fromToday(51),
      checkOut: fromToday(55),
      color: '#50A5F1',
      data: '하길동',
      location: '1호',
    },
  ],
})

//잠금객실 정보를 저장하는 atom
export const lockedRoomListAtom = atom({
  key: LOCKED_ROOM_LIST_ATOM_KEY,
  default: [
    { targetDate: fromToday(3), location: '1호' },
    { targetDate: fromToday(4), location: '1호' },
    { targetDate: fromToday(5), location: '1호' },
    { targetDate: fromToday(3), location: '2호' },
    { targetDate: fromToday(4), location: '2호' },
    { targetDate: fromToday(5), location: '2호' },
  ],
})
//Price컴포넌트에 예약이 있을때, 현재예약을 표시해주는 atom
export const currentReservationAtom = atom({
  key: CURRENT_RESERVATION_ATOM_KEY,
  default: { checkIn: null, checkOut: null, color: null, data: null },
})

//n일보기에서 n의 상태를 저장하는 atom
export const dayCountAtom = atom({
  key: DAY_COUNT_ATOM_KEY,
  default: 30,
})

//n일보기의 기준이되는 날짜를 저장하는 atom
export const standardDateAtom = atom({
  key: STANDARD_DATE_ATOM_KEY,
  default: new Date(),
})

//createReservation의 표시유무를 저장하는 atom
export const isDisplayCreateReservationAtom = atom({
  key: IS_DISPLAY_CREATE_RESERVATION_ATOM_KEY,
  default: false,
})

//readReservation의 표시유무를 저장하는 atom
export const isDisplayReadReservationAtom = atom({
  key: IS_DISPLAY_READ_RESERVATION_ATOM_KEY,
  default: false,
})

//reservationInfo의 표시유무를 저장하는 atom
export const displayAtom = atom({
  key: DISPLAY_ATOM_KEY,
  default: {
    display: 'none',
    name: '홍길동',
  },
})

//overlay의 상태를 저장하는 atom
export const overlayAtom = atom({
  key: OVERLAY_ATOM_KEY,
  default: { hoverColor: '', hoverData: '', hoverLength: '' },
})
