import { readReservationPrice } from '@api/reservationStatus/reservationStatus'
import {
  ADD_RESERVATION_ROOM_COUNT_ATOM_KEY,
  READ_RESERVATION_PRICE_SELECTOR_KEY,
  RIGHT_CLICK_POPUP_ATOM_KEY,
} from '@constant/atomKeys'
import { atom, selectorFamily } from 'recoil'

//atom
export const addReserverationRoomCountAtom = atom({
  key: ADD_RESERVATION_ROOM_COUNT_ATOM_KEY,
  default: 1,
})
export const rightClickPopupAtom = atom({
  key: RIGHT_CLICK_POPUP_ATOM_KEY,
  default: { display: 'none', screenX: '0', screenY: '0', position: 'absolute' },
})

//selector
export const readReservationPriceSelector = selectorFamily({
  key: READ_RESERVATION_PRICE_SELECTOR_KEY,
  get:
    ({ acNo, startDate, endDate }) =>
    async () =>
      await readReservationPrice({ acNo, startDate, endDate }),
})
