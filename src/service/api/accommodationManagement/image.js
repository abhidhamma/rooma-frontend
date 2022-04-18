import client from '@config/axiosClient'
import {
  CREATE_IMAGE_URL,
  DELETE_IMAGE_URL,
  READ_IMAGE_LIST_URL,
  READ_IMAGE_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

export const createImage = (formData) =>
  client.post(CREATE_IMAGE_URL, formData, formDataHeaderConfig)

export const readImageList = ({ group, acNo, rtNo }) =>
  client.get(READ_IMAGE_LIST_URL, { params: { group, acNo, rtNo } })

export const readImage = ({ fileNo }) => client.get(`${READ_IMAGE_URL}/${fileNo}`)

export const deleteImage = ({ fileNo }) => client.post(`${DELETE_IMAGE_URL}/${fileNo}`)
