import client from '@config/axiosClient'
import {
  CREATE_RESERVATION_URL,
  READ_POSSIBLE_ROOM_LIST_URL,
  READ_RESERVATION_URL,
} from '@constant/apiURLs'
export const createReservation = (json) => client.post(CREATE_RESERVATION_URL, json)
export const readReservation = ({ rrNo }) => client.get(READ_RESERVATION_URL, { params: { rrNo } })
export const readPossibleRoomList = ({ rtNo, startDate, endDate }) =>
  client.get(READ_POSSIBLE_ROOM_LIST_URL, { params: { rtNo, startDate, endDate } })
