import { readCleaningStatusList } from '@api/cleaningManagement/cleaningStatus'
import {
  CLEANGING_POPUP_ATOM_KEY,
  CLEANING_DAY_COUNT_ATOM_KEY,
  CLEANING_STANDARD_DATE_ATOM_KEY,
  READ_CLEANING_STATUS_LIST_SELECTOR_KEY,
} from '@constant/atomKeys'
import { atom, selectorFamily } from 'recoil'

//atom
//n일보기에서 n의 상태를 저장하는 atom
export const cleaningDayCountAtom = atom({
  key: CLEANING_DAY_COUNT_ATOM_KEY,
  default: 5,
})

//n일보기의 기준이되는 날짜를 저장하는 atom
export const cleaningStandardDateAtom = atom({
  key: CLEANING_STANDARD_DATE_ATOM_KEY,
  default: new Date(),
})

export const cleaningPopUpAtom = atom({
  key: CLEANGING_POPUP_ATOM_KEY,
  default: { display: false, rtNo: null, rmNo: null, workDate: null, rcNo: null },
})

//selector
export const readCleaningStatusListSelector = selectorFamily({
  key: READ_CLEANING_STATUS_LIST_SELECTOR_KEY,
  get: (jsonData) => async () => await readCleaningStatusList(jsonData),
})
