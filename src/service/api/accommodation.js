import client from '../../other/config/axiosClient'
import { CREATE_ACCOMMODATION_URL, READ_ACCOMMODATION_LIST_URL, READ_ACCOMMODATION_URL, UPDATE_ACCOMMODATION_URL } from '../../other/constant/apiURLs'
import { formDataHeader } from '../../other/util/common/axiosUtil'

export const createAccommodation = (formData) => client.post(CREATE_ACCOMMODATION_URL, formData, formDataHeader)

export const readAccommodation = ({ acNo }) =>
  client.get(READ_ACCOMMODATION_URL, {
    params: { acNo },
  })

export const readAccommodationList = (formData) => client.post(READ_ACCOMMODATION_LIST_URL, formData, formDataHeader)

export const updateAccommodation = (formData) => client.post(UPDATE_ACCOMMODATION_URL, formData, formDataHeader)
