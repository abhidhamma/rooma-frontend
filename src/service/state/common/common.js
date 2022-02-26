import { atom } from 'recoil'
import { IS_LOGGED_IN_ATOM, RENDER_COUNT_ATOM } from '../../../other/constant/atomKeys'
import { loadItem } from '../../../other/util/common/localStorage'
//테스트용으로 렌더횟수를 세는 atom
export const renderCountAtom = atom({
  key: RENDER_COUNT_ATOM,
  default: 0,
})
export const isLoggedInAtom = atom({
  key: IS_LOGGED_IN_ATOM,
  default: loadItem('user') !== null, //이렇게 하면 자동로그인
  //default: false,
})
