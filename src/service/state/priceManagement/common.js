import { PRICE_MANAGEMENT_TAB } from '@constant/atomKeys'
import { atom } from 'recoil'

//atom
export const priceManagementTabAtom = atom({
  key: PRICE_MANAGEMENT_TAB,
  default: 'roomTypePriceManagement',
})
