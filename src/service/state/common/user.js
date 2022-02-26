import { atom } from 'recoil'
import { USER_ATOM_KEY } from '../../../other/constant/atomKeys'
import { loadItem } from '../../../other/util/common/localStorage'

export const userAtom = atom({
  key: USER_ATOM_KEY,
  default: loadItem('user'),
})
