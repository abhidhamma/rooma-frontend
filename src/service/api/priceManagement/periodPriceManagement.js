import client from '@config/axiosClient'
import { READ_ROOM_PRICE_PERIOD_URL, UPDATE_ROOM_PRICE_PERIOD_URL } from '@constant/apiURLs'

export const updateRoomPricePeriod = (json) => client.post(UPDATE_ROOM_PRICE_PERIOD_URL, json)
export const readRoomPrice = ({ rpNo }) =>
  client.get(READ_ROOM_PRICE_PERIOD_URL, { params: { rpNo } })
