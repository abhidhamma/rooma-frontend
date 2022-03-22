import { createReservation } from '@api/reservationStatus/createReservation'
import { CREATE_RESERVATION_ATOM_KEY, CREATE_RESERVATION_SELECTOR_KEY } from '@constant/atomKeys'
import { atom, selectorFamily } from 'recoil'

//atom
export const createReservationAtom = atom({
  key: CREATE_RESERVATION_ATOM_KEY,
  default: {},
})
// selector
export const createReservationSelector = selectorFamily({
  key: CREATE_RESERVATION_SELECTOR_KEY,
  get: (jsonData) => async () => await createReservation(jsonData),
})
