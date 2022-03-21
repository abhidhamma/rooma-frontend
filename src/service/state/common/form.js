import { atom } from 'recoil'
import { DEFAULT_VALUES_ATOM_KEY, ROOM_SELECT_ATOM } from '@constant/atomKeys'

export const defaultValuesAtom = atom({
  key: DEFAULT_VALUES_ATOM_KEY,
  default: null,
})
export const roomSelectAtom = atom({
  key: ROOM_SELECT_ATOM,
  default: {},
})
