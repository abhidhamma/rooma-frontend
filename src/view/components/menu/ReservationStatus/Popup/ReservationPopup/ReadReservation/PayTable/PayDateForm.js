import Calendar from '@components/common/Calendar'
import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { isDate } from 'date-fns'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function PayDateForm({
  register,
  reset,
  getValues,
  top,
  count,
  defaultDate,
  readOnly,
}) {
  const selectedDate = useRecoilValue(selectedDateAtom)
  const setShowCalendar = useSetRecoilState(showCalendarAtom)
  const payDateCalendarName = `payDate${count}`

  const handleCalendar = () => {
    if (!readOnly) {
      setShowCalendar((prev) => ({
        ...prev,
        [payDateCalendarName]: !prev[payDateCalendarName],
      }))
    }
  }

  useEffect(() => {
    console.log('PayDateForm useEffect')
    console.log(selectedDate)
    reset({
      ...getValues(),
      [payDateCalendarName]: isDate(selectedDate[payDateCalendarName])
        ? formatyyyyMMddWithHyphen(selectedDate[payDateCalendarName])
        : selectedDate[payDateCalendarName],
    })
  }, [selectedDate])
  return (
    <td>
      <input
        type='text'
        {...register(`payDate${count}`)}
        readOnly
        defaultValue={defaultDate}
        style={{ width: '95px' }}
        onClick={handleCalendar}
      />
      <Calendar
        top={`${top}px`}
        left={'387px'}
        calendarName={payDateCalendarName}
        defaultDate={stringToDate(defaultDate)}
      />
    </td>
  )
}
