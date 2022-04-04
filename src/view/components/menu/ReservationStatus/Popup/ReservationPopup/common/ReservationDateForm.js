import Calendar from '@components/common/Calendar'
import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { betweenyyyyMMdd, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { isDate } from 'date-fns'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function ReservationDateForm({
  register,
  reset,
  getValues,
  watch,
  top,
  count,
  defaultCheckInDate,
  defaultCheckOutDate,
}) {
  const selectedDate = useRecoilValue(selectedDateAtom)
  const setShowCalendar = useSetRecoilState(showCalendarAtom)
  const checkinDateCalendarName = `checkinDate${count}`
  const checkoutDateCalendarName = `checkoutDate${count}`

  const handleSaleStartdateCalendar = () =>
    setShowCalendar((prev) => ({
      ...prev,
      [checkinDateCalendarName]: !prev[checkinDateCalendarName],
    }))
  const handleSaleEnddateCalendar = () =>
    setShowCalendar((prev) => ({
      ...prev,
      [checkoutDateCalendarName]: !prev[checkoutDateCalendarName],
    }))

  useEffect(() => {
    reset({
      ...getValues(),
      [checkinDateCalendarName]: isDate(selectedDate[checkinDateCalendarName])
        ? formatyyyyMMddWithHyphen(selectedDate[checkinDateCalendarName])
        : selectedDate[checkinDateCalendarName],
      [checkoutDateCalendarName]: isDate(selectedDate[checkoutDateCalendarName])
        ? formatyyyyMMddWithHyphen(selectedDate[checkoutDateCalendarName])
        : selectedDate[checkoutDateCalendarName],
    })
  }, [selectedDate])
  const night = betweenyyyyMMdd(watch(`checkinDate${count}`), watch(`checkoutDate${count}`))
  return (
    <div className='term'>
      <span onClick={handleSaleStartdateCalendar} style={{ display: 'grid' }}>
        <input
          type='text'
          {...register(`checkinDate${count}`)}
          readOnly
          defaultValue={defaultCheckInDate}
          style={{ width: '95px' }}
        />
      </span>
      <span className='day'>{`${night}박`}</span>
      <span onClick={handleSaleEnddateCalendar} style={{ display: 'grid' }}>
        <input
          type='text'
          {...register(`checkoutDate${count}`)}
          readOnly
          defaultValue={defaultCheckOutDate}
          style={{ justifySelf: 'end', width: '95px' }}
        />
      </span>
      <Calendar
        top={`${top}px`}
        left={'-1px'}
        calendarName={checkinDateCalendarName}
        defaultDate={stringToDate(defaultCheckInDate)}
      />
      <Calendar
        top={`${top}px`}
        left={'144px'}
        calendarName={checkoutDateCalendarName}
        defaultDate={stringToDate(defaultCheckOutDate)}
      />
    </div>
  )
}
