import client from '@config/axiosClient'
import { READ_CLEANING_STATUS_LIST_URL } from '@constant/apiURLs'
export const readCleaningStatusList = ({ acNo, startDate, endDate }) =>
  client.get(READ_CLEANING_STATUS_LIST_URL, { params: { acNo, startDate, endDate } })
