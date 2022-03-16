import { selectorFamily } from 'recoil'
import {
  CREATE_ROOM_SELECTOR_KEY,
  READ_ROOM_SELECTOR_KEY,
  READ_ROOM_LIST_SELECTOR_KEY,
  UPDATE_ROOM_SELECTOR_KEY,
} from '@constant/atomKeys'
import { createRoom, readRoom, readRoomList, updateRoom } from '@api/accommodation/room'

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
  get: (formData) => async () => await readRoomList(formData),
})

export const updateRoomSelector = selectorFamily({
  key: UPDATE_ROOM_SELECTOR_KEY,
  get: (formData) => async () => await updateRoom(formData),
})
