import client from '@config/axiosClient'
import {
  CREATE_ROOMTYPE_API_URL,
  READ_ROOMTYPE_LIST_API_URL,
  READ_ROOMTYPE_API_URL,
  UPDATE_ROOMTYPE_API_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

//숙소관리 메뉴의 객실타입등록관리 탭에 해당하는 api

export const createRoomType = (formData) =>
  client.post(CREATE_ROOMTYPE_API_URL, formData, formDataHeaderConfig)

export const readRoomType = ({ rtNo }) =>
  client.get(READ_ROOMTYPE_API_URL, {
    params: { rtNo },
  })

export const readRoomTypeList = (formData) =>
  client.post(READ_ROOMTYPE_LIST_API_URL, formData, formDataHeaderConfig)

export const updateRoomType = (formData) =>
  client.post(UPDATE_ROOMTYPE_API_URL, formData, formDataHeaderConfig)
