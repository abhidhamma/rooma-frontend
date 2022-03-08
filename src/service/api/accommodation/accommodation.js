import client from '@config/axiosClient'
import {
  CREATE_ACCOMMODATION_URL,
  READ_ACCOMMODATION_LIST_URL,
  READ_ACCOMMODATION_URL,
  UPDATE_ACCOMMODATION_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

//숙소관리 메뉴의 숙소등록관리탭에 해당하는 api

export const createAccommodation = (formData) =>
  client.post(CREATE_ACCOMMODATION_URL, formData, formDataHeaderConfig)

export const readAccommodation = ({ acNo }) =>
  client.get(READ_ACCOMMODATION_URL, {
    params: { acNo },
  })

export const readAccommodationList = (formData) =>
  client.post(READ_ACCOMMODATION_LIST_URL, formData, formDataHeaderConfig)

export const updateAccommodation = (formData) =>
  client.post(UPDATE_ACCOMMODATION_URL, formData, formDataHeaderConfig)
