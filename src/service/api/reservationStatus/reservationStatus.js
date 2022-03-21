import client from '@config/axiosClient'
import { READ_RESERVATION_PRICE_URL } from '@constant/apiURLs'

export const readReservationPrice = ({ acNo, startDate, endDate }) =>
  client.get(READ_RESERVATION_PRICE_URL, { params: { acNo, startDate, endDate } })
