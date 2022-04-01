import client from '@config/axiosClient'
import {
  LOCK_ROOM_URL,
  READ_RESERVATION_PRICE_URL,
  UNLOCK_ROOM_URL,
  UPDATE_RESERVATION_DATE_URL,
  UPDATE_RESERVATION_STATUS_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

export const readReservationPrice = ({ acNo, startDate, endDate }) =>
  client.get(READ_RESERVATION_PRICE_URL, { params: { acNo, startDate, endDate } })
export const lockRoom = (formData) => client.post(LOCK_ROOM_URL, formData, formDataHeaderConfig)
export const unlockRoom = (formData) => client.post(UNLOCK_ROOM_URL, formData, formDataHeaderConfig)
export const updateReservationStatus = (formData) =>
  client.post(UPDATE_RESERVATION_STATUS_URL, formData, formDataHeaderConfig)
export const updateReservationDate = (formData) =>
  client.post(UPDATE_RESERVATION_DATE_URL, formData, formDataHeaderConfig)
