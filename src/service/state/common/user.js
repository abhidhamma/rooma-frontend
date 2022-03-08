import { atom } from 'recoil'
import { USER_ATOM_KEY } from '@constant/atomKeys'
import { loadItem } from '@util/common/localStorage'

export const userAtom = atom({
  key: USER_ATOM_KEY,
  default: loadItem('user'),
})
