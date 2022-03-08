import { selectorFamily } from 'recoil'
import {
  CREATE_ROOMTYPE_KEY,
  READ_ROOMTYPE_KEY,
  READ_ROOMTYPE_LIST_KEY,
  UPDATE_ROOMTYPE_KEY,
} from '@constant/atomKeys'
import {
  createRoomType,
  readRoomType,
  readRoomTypeList,
  updateRoomType,
} from '@api/accommodation/roomType'

//selector
export const createRoomTypeSelector = selectorFamily({
  key: CREATE_ROOMTYPE_KEY,
  get: (formData) => async () => await createRoomType(formData),
})

export const readRoomTypeSelector = selectorFamily({
  key: READ_ROOMTYPE_KEY,
  get:
    ({ acNo }) =>
    async () =>
      await readRoomType({ acNo }),
})

export const readRoomTypeListSelector = selectorFamily({
  key: READ_ROOMTYPE_LIST_KEY,
  get: (formData) => async () => await readRoomTypeList(formData),
})

export const updateRoomTypeSelector = selectorFamily({
  key: UPDATE_ROOMTYPE_KEY,
  get: (formData) => async () => await updateRoomType(formData),
})
