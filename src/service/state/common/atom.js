import { atom } from 'recoil'
import { RENDER_COUNT_ATOM } from '../../../other/constant/atomKeys'

//테스트용으로 렌더횟수를 세는 atom
export const renderCountAtom = atom({
  key: RENDER_COUNT_ATOM,
  default: 0,
})
