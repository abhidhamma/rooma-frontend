import client from '@config/axiosClient'
import {
  CREATE_ROOMTYPE_URL,
  READ_ROOMTYPE_LIST_URL,
  READ_ROOMTYPE_URL,
  UPDATE_ROOMTYPE_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

//숙소관리 메뉴의 객실타입등록관리 탭에 해당하는 api

export const createRoomType = (formData) =>
  client.post(CREATE_ROOMTYPE_URL, formData, formDataHeaderConfig)

export const readRoomType = ({ acNo }) =>
  client.get(READ_ROOMTYPE_URL, {
    params: { acNo },
  })

export const readRoomTypeList = (formData) =>
  client.post(READ_ROOMTYPE_LIST_URL, formData, formDataHeaderConfig)

export const updateRoomType = (formData) =>
  client.post(UPDATE_ROOMTYPE_URL, formData, formDataHeaderConfig)
