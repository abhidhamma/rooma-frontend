import { SELECTED_DATE_ATOM_KEY, SELECTED_MONTH_ATOM_KEY } from '@constant/atomKeys'
import { atom } from 'recoil'

function WithoutTime(dateTime) {
  var date = new Date(dateTime.getTime())
  date.setHours(0, 0, 0, 0)
  return date
}

//달력에서 선택한 날짜를 저장
export const selectedDateAtom = atom({
  key: SELECTED_DATE_ATOM_KEY,
  default: WithoutTime(new Date()),
})
//달력에서 오늘날짜의 달을 저장 (변경시 달만 변경)
export const selectedMonthAtom = atom({
  key: SELECTED_MONTH_ATOM_KEY,
  default: WithoutTime(new Date()),
})
