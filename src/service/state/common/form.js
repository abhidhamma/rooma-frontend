import { atom } from 'recoil'
import { DEFAULT_VALUES_ATOM } from '../../../other/constant/atomKeys'

export const defaultValuesAtom = atom({
  key: DEFAULT_VALUES_ATOM,
  default: null,
})
