import client from '@config/axiosClient'
import { CREATE_RESERVATION_URL, READ_RESERVATION_URL } from '@constant/apiURLs'
export const createReservation = (json) => client.post(CREATE_RESERVATION_URL, json)
export const readReservation = ({ rrNo }) => client.get(READ_RESERVATION_URL, { params: { rrNo } })
