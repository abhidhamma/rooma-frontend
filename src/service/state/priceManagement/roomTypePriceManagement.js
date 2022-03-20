import { readRoomPrice } from '@api/priceManagement/periodPriceManagement'
import { updateRoomTypePrices } from '@api/priceManagement/roomTypePriceManagement'
import {
  READ_ROOM_PRICE_SELECTOR_KEY,
  UPDATE_ROOMTYPE_PRICES_SELECTOR_KEY,
} from '@constant/atomKeys'
import { selectorFamily } from 'recoil'

export const updateRoomTypePricesSelector = selectorFamily({
  key: UPDATE_ROOMTYPE_PRICES_SELECTOR_KEY,
  get: (json) => async () => await updateRoomTypePrices(json),
})
export const readRoomPriceSelector = selectorFamily({
  key: READ_ROOM_PRICE_SELECTOR_KEY,
  get:
    ({ rpNo }) =>
    async () => {
      if (rpNo === undefined) {
        return { data: { originPrice: '', salePrice: '', providePrice: '' } }
      } else {
        return await readRoomPrice({ rpNo })
      }
    },
})
