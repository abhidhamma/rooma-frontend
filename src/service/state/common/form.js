import { atom } from 'recoil'
import { DEFAULT_VALUES_ATOM_KEY } from '@constant/atomKeys'

export const defaultValuesAtom = atom({
  key: DEFAULT_VALUES_ATOM_KEY,
  default: null,
})
