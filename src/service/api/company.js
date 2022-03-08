import { ADDCOMPANY_URL } from '@constant/apiURLs'
import client from '@config/axiosClient'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

export const addCompany = (formData) =>
  client.post(ADDCOMPANY_URL, formData, formDataHeaderConfig)
