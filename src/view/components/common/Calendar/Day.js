import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { formatdd } from '@util/common/dateUtil'
import { isDate, isSameDay, isSaturday, isSunday } from 'date-fns'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function Day({ date, calendarName }) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom)
  const setShowCalendar = useSetRecoilState(showCalendarAtom)

  const className = makeClassName(date, selectedDate[calendarName])
  const dd = formatdd(date)
  const selectDate = () => {
    setSelectedDate((prev) => ({ ...prev, [calendarName]: date }))
    setShowCalendar((prev) => ({ ...prev, [calendarName]: false }))
  }

  return (
    <td>
      <div className={className} onClick={selectDate}>
        {dd}
      </div>
    </td>
  )
}
const makeClassName = (date, selectedDate) => {
  let classNameString = 'day'
  if (isSunday(date)) {
    classNameString += ' sun'
  } else if (isSaturday(date)) {
    classNameString += ' sat'
  }

  if (!isDate(selectedDate)) {
    return classNameString
  }

  if (isSameDay(date, selectedDate)) {
    classNameString += ' today'
  }
  return classNameString
}
