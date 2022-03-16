import { atom } from 'recoil'
import {
  CURRENT_COMPANY_ATOM_KEY,
  IS_LOGGED_IN_ATOM_KEY,
  RENDER_COUNT_ATOM_KEY,
} from '@constant/atomKeys'
import { loadItem } from '@util/common/localStorage'
//테스트용으로 렌더횟수를 세는 atom
export const renderCountAtom = atom({
  key: RENDER_COUNT_ATOM_KEY,
  default: 0,
})
export const isLoggedInAtom = atom({
  key: IS_LOGGED_IN_ATOM_KEY,
  default: loadItem('user') !== null, //이렇게 하면 자동로그인
  //default: false,
})
//Header - CompanySelect
export const currentCompanyAtom = atom({
  key: CURRENT_COMPANY_ATOM_KEY,
  default: '1',
})
