import { readCalculateReservationList } from '@api/calculateManagement/reservationList'
import { AMOUNT_ATOM_KEY, READ_CALCULATE_RESERVATION_LIST_SELECTOR_KEY } from '@constant/atomKeys'
import { atom, selectorFamily } from 'recoil'

//selector
export const readCalculateReservationListSelector = selectorFamily({
  key: READ_CALCULATE_RESERVATION_LIST_SELECTOR_KEY,
  get: (formData) => async () => await readCalculateReservationList(formData),
})
//atom
export const amountAtom = atom({
  key: AMOUNT_ATOM_KEY,
  default: {
    totalNight: 0,
    totalRoomSalePrice: 0,
    totalAddPersionPrice: 0,
    totalAddOptionPrice: 0,
    totalAdjRoomPrice: 0,
    totalPayAmount: 0,
    totalPriceSum: 0,
    totalRemainAmount: 0,
  },
})
