import client from '@config/axiosClient'
import {
  READ_ROOM_PRICE_LIST_CALENDAR_URL,
  UPDATE_ROOM_PRICE_LIST_CALENDAR_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'
export const readCalendarRoomPriceList = (formData) =>
  client.post(READ_ROOM_PRICE_LIST_CALENDAR_URL, formData, formDataHeaderConfig)
export const updateCalendarRoomPriceList = (json) =>
  client.post(UPDATE_ROOM_PRICE_LIST_CALENDAR_URL, json)
