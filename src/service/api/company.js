import { CREATE_COMPANY_API_URL, READ_COMPANY_BY_NO_API_URL } from '@constant/apiURLs'
import client from '@config/axiosClient'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

export const addCompany = (formData) =>
  client.post(CREATE_COMPANY_API_URL, formData, formDataHeaderConfig)
export const readCompanyByNo = ({ cpNo }) =>
  client.get(READ_COMPANY_BY_NO_API_URL, {
    params: { cpNo },
  })
