import { atom } from 'recoil'
import { CURRENT_INDEX_ATOM, CURRENT_PAGE_ATOM, TOTAL_COUNT_ATOM } from '../../../other/constant/atomKeys'

export const totalCountAtom = atom({
  key: TOTAL_COUNT_ATOM,
  default: 0,
})
export const currentPageAtom = atom({
  key: CURRENT_PAGE_ATOM,
  default: 1,
})
export const currentIndexAtom = atom({
  key: CURRENT_INDEX_ATOM,
  default: 0,
})
