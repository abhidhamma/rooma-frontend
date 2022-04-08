import { readReservationList } from '@api/reservationManagement/reservationManagement'
import {
  READ_RESERVATION_LIST_ATOM_KEY,
  READ_RESERVATION_LIST_SELECTOR_KEY,
} from '@constant/atomKeys'
import { atom, selectorFamily } from 'recoil'

// selector
export const readReservationListSelector = selectorFamily({
  key: READ_RESERVATION_LIST_SELECTOR_KEY,
  get: (jsonData) => async () => await readReservationList(jsonData),
})
// atom
export const readReservationListAtom = atom({
  key: READ_RESERVATION_LIST_ATOM_KEY,
  default: { list: [], totalCount: 0 },
})
