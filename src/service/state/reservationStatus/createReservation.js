import { CREATE_RESERVATION_ATOM_KEY } from '@constant/atomKeys'
import { atom } from 'recoil'

//atom
export const createReservationAtom = atom({
  key: CREATE_RESERVATION_ATOM_KEY,
  default: {},
})
