import { createImage, deleteImage, readImageList } from '@api/accommodationManagement/image'
import {
  CREATE_IMAGE_SELECTOR_KEY,
  DELETE_IMAGE_SELECTOR_KEY,
  READ_IMAGE_LIST_SELECTOR_KEY,
  READ_IMAGE_SELECTOR_KEY,
} from '@constant/atomKeys'
import { selectorFamily } from 'recoil'

//selector
export const createImageSelector = selectorFamily({
  key: CREATE_IMAGE_SELECTOR_KEY,
  get: (formData) => async () => await createImage(formData),
})

export const readImageListSelector = selectorFamily({
  key: READ_IMAGE_LIST_SELECTOR_KEY,
  get: (jsonData) => async () => await readImageList(jsonData),
})

export const readImage = selectorFamily({
  key: READ_IMAGE_SELECTOR_KEY,
  get: (jsonData) => async () => await readImage(jsonData),
})

export const deleteImageSelector = selectorFamily({
  key: DELETE_IMAGE_SELECTOR_KEY,
  get: (jsonData) => async () => await deleteImage(jsonData),
})
