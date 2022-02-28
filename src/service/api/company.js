import { ADDCOMPANY_URL } from '../../other/constant/apiURLs'
import client from '../../other/config/axiosClient'

export const addCompany = (formData) =>
  client.post(ADDCOMPANY_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
