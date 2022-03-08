import { atom } from 'recoil'
import { CURRENT_INDEX_ATOM_KEY, CURRENT_PAGE_ATOM_KEY, TOTAL_COUNT_ATOM_KEY } from '@constant/atomKeys'

export const totalCountAtom = atom({
  key: TOTAL_COUNT_ATOM_KEY,
  default: 0,
})
export const currentPageAtom = atom({
  key: CURRENT_PAGE_ATOM_KEY,
  default: 1,
})
export const currentIndexAtom = atom({
  key: CURRENT_INDEX_ATOM_KEY,
  default: 0,
})
