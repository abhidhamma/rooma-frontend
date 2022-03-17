import { atom, selectorFamily } from 'recoil'
import {
  CREATE_ROOMTYPE_SELECTOR_KEY,
  READ_ROOMTYPE_SELECTOR_KEY,
  READ_ROOMTYPE_LIST_SELECTOR_KEY,
  UPDATE_ROOMTYPE_SELECTOR_KEY,
  ETC_CONFIG_OPTION_COUNT_ATOM_KEY,
  BREAKFAST_CONFIG_OPTION_COUNT_ATOM_KEY,
} from '@constant/atomKeys'
import {
  createRoomType,
  readRoomType,
  readRoomTypeList,
  updateRoomType,
} from '@api/accommodation/roomType'

//atom
export const breakfastConfigOptionCountAtom = atom({
  key: BREAKFAST_CONFIG_OPTION_COUNT_ATOM_KEY,
  default: 1,
})
export const etcConfigOptionCountAtom = atom({
  key: ETC_CONFIG_OPTION_COUNT_ATOM_KEY,
  default: 1,
})

//selector
export const createRoomTypeSelector = selectorFamily({
  key: CREATE_ROOMTYPE_SELECTOR_KEY,
  get: (formData) => async () => await createRoomType(formData),
})

export const readRoomTypeSelector = selectorFamily({
  key: READ_ROOMTYPE_SELECTOR_KEY,
  get:
    ({ rtNo }) =>
    async () =>
      await readRoomType({ rtNo }),
})

export const readRoomTypeListSelector = selectorFamily({
  key: READ_ROOMTYPE_LIST_SELECTOR_KEY,
  get: (formData) => async () => await readRoomTypeList(formData),
})

export const updateRoomTypeSelector = selectorFamily({
  key: UPDATE_ROOMTYPE_SELECTOR_KEY,
  get: (formData) => async () => await updateRoomType(formData),
})
