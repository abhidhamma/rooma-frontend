import { SELECTED_DATE_ATOM_KEY, SELECTED_MONTH_ATOM_KEY } from '@constant/atomKeys'
import { WithoutTime } from '@util/common/dateUtil'
import { atom } from 'recoil'

//달력에서 선택한 날짜를 저장
export const selectedDateAtom = atom({
  key: SELECTED_DATE_ATOM_KEY,
  default: { startDate: '입력해주세요', endDate: '입력해주세요' },
})
//달력에서 오늘날짜의 달을 저장 (변경시 달만 변경)
export const selectedMonthAtom = atom({
  key: SELECTED_MONTH_ATOM_KEY,
  default: WithoutTime(new Date()),
})
