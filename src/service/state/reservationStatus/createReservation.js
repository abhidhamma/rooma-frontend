import {
  createReservation,
  readPossibleRoomList,
  readReservation,
} from '@api/reservationStatus/createReservation'
import {
  CREATE_RESERVATION_ATOM_KEY,
  CREATE_RESERVATION_SELECTOR_KEY,
  READ_POSSIBLE_ROOM_LIST_SELECTOR_KEY,
  READ_RESERVATION_SELECTOR_KEY,
} from '@constant/atomKeys'
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
export const readReservationSelector = selectorFamily({
  key: READ_RESERVATION_SELECTOR_KEY,
  get:
    ({ rrNo }) =>
    async () =>
      await readReservation({ rrNo }),
})
export const readPossibleReservationSelector = selectorFamily({
  key: READ_POSSIBLE_ROOM_LIST_SELECTOR_KEY,
  get:
    ({ rtNo, startDate, endDate }) =>
    async () =>
      await readPossibleRoomList({ rtNo, startDate, endDate }),
})
