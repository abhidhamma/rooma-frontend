import { updateRoomPricePeriod } from '@api/priceManagement/periodPriceManagement'
import {
  CURRENT_PERIOD_PRICE_MANAGEMENT_ROOM_TYPE,
  CURRENT_PERIOD_PRICE_MANAGEMENT_WEEK_PRICES,
  UPDATE_ROOM_PRICE_PERIOD_SELECTOR_KEY,
} from '@constant/atomKeys'
import { atom, selectorFamily } from 'recoil'

//atom
export const currentPeriodPriceManagementRoomTypeAtom = atom({
  key: CURRENT_PERIOD_PRICE_MANAGEMENT_ROOM_TYPE,
  default: { originPrice: '', salePrice: '', providePrice: '', rtNo: 'unSelected' },
})
export const currentPeriodPriceManagementWeekPricesAtom = atom({
  key: CURRENT_PERIOD_PRICE_MANAGEMENT_WEEK_PRICES,
  default: {},
})

// selector
export const updatePeriodRoomPriceSelector = selectorFamily({
  key: UPDATE_ROOM_PRICE_PERIOD_SELECTOR_KEY,
  get: (json) => async () => await updateRoomPricePeriod(json),
})
