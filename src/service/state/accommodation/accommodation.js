import { atom, selectorFamily } from 'recoil'
import {
  ACCOMODATION_LIST_ATOM_KEY,
  CREATE_ACCOMMODATION_SELECTOR_KEY,
  READ_ACCOMMODATION_SELECTOR_KEY,
  READ_ACCOMMODATION_LIST_SELECTOR_KEY,
  UPDATE_ACCOMMODATION_SELECTOR_KEY,
} from '@constant/atomKeys'
import {
  createAccommodation,
  readAccommodation,
  readAccommodationList,
  updateAccommodation,
} from '@api/accommodation/accommodation'

//atom
export const accommodationListAtom = atom({
  key: ACCOMODATION_LIST_ATOM_KEY,
  default: [],
})
//selector
export const createAccommodationSelector = selectorFamily({
  key: CREATE_ACCOMMODATION_SELECTOR_KEY,
  get: (formData) => async () => await createAccommodation(formData),
})

export const readAccommodationSelector = selectorFamily({
  key: READ_ACCOMMODATION_SELECTOR_KEY,
  get:
    ({ acNo }) =>
    async () =>
      await readAccommodation({ acNo }),
})

export const readAccommodationListSelector = selectorFamily({
  key: READ_ACCOMMODATION_LIST_SELECTOR_KEY,
  get: (formData) => async () => await readAccommodationList(formData),
})

export const updateAccommodationSelector = selectorFamily({
  key: UPDATE_ACCOMMODATION_SELECTOR_KEY,
  get: (formData) => async () => await updateAccommodation(formData),
})
