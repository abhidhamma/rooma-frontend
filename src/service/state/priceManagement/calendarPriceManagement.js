import { CALENDAR_PRICE_MANAGEMENT_CURRENT_MONTH } from '@constant/atomKeys'
import { WithoutTime } from '@util/common/dateUtil'
import { atom } from 'recoil'

//atom
export const calendarPriceManagementCurrentMonthAtom = atom({
  key: CALENDAR_PRICE_MANAGEMENT_CURRENT_MONTH,
  default: WithoutTime(new Date()),
})

// selector
// export const updatePeriodRoomPriceSelector = selectorFamily({
//   key: UPDATE_ROOM_PRICE_PERIOD_SELECTOR_KEY,
//   get: (json) => async () => await updateRoomPricePeriod(json),
// })
