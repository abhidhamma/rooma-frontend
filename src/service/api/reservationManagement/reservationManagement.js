import client from '@config/axiosClient'
import { READ_RESERVATION_LIST_URL } from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'
export const readReservationList = (formData) =>
  client.post(READ_RESERVATION_LIST_URL, formData, formDataHeaderConfig)
