import { SEARCH_KEYWORD_ATOM_KEY } from '@constant/atomKeys'
import { atom } from 'recoil'

//atom
export const searchKeywordAtom = atom({
  key: SEARCH_KEYWORD_ATOM_KEY,
  default: '',
})
