import client from '@config/axiosClient'
import { UPDATE_ROOMTYPE_PRICES_URL } from '@constant/apiURLs'
export const updateRoomTypePrices = (json) => client.post(UPDATE_ROOMTYPE_PRICES_URL, json)
