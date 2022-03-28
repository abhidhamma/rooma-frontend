import { selectorFamily } from 'recoil'
import {
  CREATE_ROOM_SELECTOR_KEY,
  READ_ROOM_SELECTOR_KEY,
  READ_ROOM_LIST_SELECTOR_KEY,
  UPDATE_ROOM_SELECTOR_KEY,
  DELETE_ROOM_SELECTOR_KEY,
} from '@constant/atomKeys'
import {
  createRoom,
  deleteRoom,
  readRoom,
  readRoomList,
  updateRoom,
} from '@api/accommodationManagement/room'

//selector
export const createRoomSelector = selectorFamily({
  key: CREATE_ROOM_SELECTOR_KEY,
  get: (formData) => async () => await createRoom(formData),
})

export const readRoomSelector = selectorFamily({
  key: READ_ROOM_SELECTOR_KEY,
  get:
    ({ rmNo }) =>
    async () =>
      await readRoom({ rmNo }),
})

export const readRoomListSelector = selectorFamily({
  key: READ_ROOM_LIST_SELECTOR_KEY,
  get: (formData) => async () => {
    if (formData === false) {
      return {
        data: {
          data: { list: [] },
        },
      }
    } else {
      return await readRoomList(formData)
    }
  },
})

export const updateRoomSelector = selectorFamily({
  key: UPDATE_ROOM_SELECTOR_KEY,
  get: (formData) => async () => await updateRoom(formData),
})
export const deleteRoomSelector = selectorFamily({
  key: DELETE_ROOM_SELECTOR_KEY,
  get: (formData) => async () => await deleteRoom(formData),
})
