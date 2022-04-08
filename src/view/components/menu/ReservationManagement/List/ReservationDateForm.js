import Calendar from '@components/common/Calendar'
import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { betweenyyyyMMdd, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { isDate } from 'date-fns'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function ReservationDateForm({ register, reset, getValues, watch, top }) {
  const selectedDate = useRecoilValue(selectedDateAtom)
  const setShowCalendar = useSetRecoilState(showCalendarAtom)
  const checkinDateCalendarName = `startDate`
  const checkoutDateCalendarName = `endDate`

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

  return (
    <>
      <div className='date'>
        <span>시작일</span>
        <input
          type='text'
          placeholder='기간선택'
          className='left'
          {...register('startDate')}
          readOnly
          onClick={handleSaleStartdateCalendar}
        />
      </div>
      <div className='mgl_5 mgr_5 date'>
        <span>종료일</span>
        <input
          type='text'
          placeholder='기간선택'
          className='left'
          {...register('endDate')}
          readOnly
          onClick={handleSaleEnddateCalendar}
        />
      </div>
      <Calendar
        top={`${top}px`}
        left={'218px'}
        calendarName={checkinDateCalendarName}
        defaultDate={stringToDate(watch('startDate'))}
      />
      <Calendar
        top={`${top}px`}
        left={'463px'}
        calendarName={checkoutDateCalendarName}
        defaultDate={stringToDate(watch('endDate'))}
      />
    </>
  )
}
