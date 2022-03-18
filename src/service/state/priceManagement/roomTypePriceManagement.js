import { updateRoomTypePrices } from '@api/priceManagement/roomTypePriceManagement'
import { UPDATE_ROOMTYPE_PRICES_SELECTOR_KEY } from '@constant/atomKeys'
import { selectorFamily } from 'recoil'

export const updateRoomTypePricesSelector = selectorFamily({
  key: UPDATE_ROOMTYPE_PRICES_SELECTOR_KEY,
  get: (json) => async () => await updateRoomTypePrices(json),
})
