import client from '@config/axiosClient'
import {
  CREATE_ROOM_URL,
  DELETE_ROOM_URL,
  READ_ROOM_LIST_URL,
  READ_ROOM_URL,
  UPDATE_ROOM_URL,
} from '@constant/apiURLs'
import { formDataHeaderConfig } from '@util/common/axiosUtil'

//숙소관리 메뉴의 객실타입등록관리 탭에 해당하는 api

export const createRoom = (formData) => client.post(CREATE_ROOM_URL, formData, formDataHeaderConfig)

export const readRoom = ({ rmNo }) =>
  client.get(READ_ROOM_URL, {
    params: { rmNo },
  })

export const readRoomList = (formData) =>
  client.post(READ_ROOM_LIST_URL, formData, formDataHeaderConfig)

export const updateRoom = (formData) => client.post(UPDATE_ROOM_URL, formData, formDataHeaderConfig)
export const deleteRoom = (formData) => client.post(DELETE_ROOM_URL, formData, formDataHeaderConfig)
