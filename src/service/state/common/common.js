import { atom } from 'recoil'
import {
  CURRENT_ACCOMMODATION_ATOM_KEY,
  CURRENT_COMPANY_ATOM_KEY,
  DIMMD_LEYER_ATOM_KEY,
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
  // default: false,
})
//Header - CompanySelect
export const currentCompanyAtom = atom({
  key: CURRENT_COMPANY_ATOM_KEY,
  default: '1',
})
export const currentAccommodationAtom = atom({
  key: CURRENT_ACCOMMODATION_ATOM_KEY,
  default: { acNo: '65' },
})
//팝업시 뒷배경 검은색으로 바꿔주는 atom
export const dimmdLayerAtom = atom({
  key: DIMMD_LEYER_ATOM_KEY,
  default: false,
})
