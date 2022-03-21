import {
  CALENDAR_PRICE_MANAGEMENT_CURRENT_MONTH,
  READ_ROOM_PRICE_CALENDAR_SELECTOR_KEY,
  UPDATE_ROOM_PRICE_CALENDAR_SELECTOR_KEY,
} from '@constant/atomKeys'
import { WithoutTime } from '@util/common/dateUtil'
import { atom, selectorFamily } from 'recoil'
import {
  updateCalendarRoomPriceList,
  readCalendarRoomPriceList,
} from '@api/priceManagement/calendarPriceManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'

//atom
export const calendarPriceManagementCurrentMonthAtom = atom({
  key: CALENDAR_PRICE_MANAGEMENT_CURRENT_MONTH,
  default: WithoutTime(new Date()),
})

//selector
export const updateCalendarRoomPriceListSelector = selectorFamily({
  key: UPDATE_ROOM_PRICE_CALENDAR_SELECTOR_KEY,
  get: (json) => async () => await updateCalendarRoomPriceList(json),
})
export const readCalendarRoomPriceListSelector = selectorFamily({
  key: READ_ROOM_PRICE_CALENDAR_SELECTOR_KEY,
  get:
    ({ rtNo, startDate, endDate }) =>
    async () => {
      if (rtNo === undefined || rtNo === '') {
        return { data: { data: { list: {} } } }
      } else {
        return await readCalendarRoomPriceList(getFormDataFromJson({ rtNo, startDate, endDate }))
      }
    },
})
