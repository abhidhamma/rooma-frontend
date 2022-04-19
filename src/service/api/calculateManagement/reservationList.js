import client from '@config/axiosClient'
import { READ_CALCULATE_RESERVATION_LIST_URL } from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

export const readCalculateReservationList = (formData) =>
  client.post(READ_CALCULATE_RESERVATION_LIST_URL, formData, formDataHeaderConfig)
