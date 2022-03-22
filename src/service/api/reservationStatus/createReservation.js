import client from '@config/axiosClient'
import { CREATE_RESERVATION_URL } from '@constant/apiURLs'
export const createReservation = (json) => client.post(CREATE_RESERVATION_URL, json)
