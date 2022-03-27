import Calendar from '@components/common/Calendar'
import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { isDate } from 'date-fns'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function SaleDateForm({ register, reset, top }) {
  const selectedDate = useRecoilValue(selectedDateAtom)
  const setShowCalendar = useSetRecoilState(showCalendarAtom)
  const saleStartdateCalendarName = 'saleStartdate'
  const saleEnddateCalendarName = 'saleEnddate'

  const handleSaleStartdateCalendar = () =>
    setShowCalendar((prev) => ({
      ...prev,
      [saleStartdateCalendarName]: !prev[saleStartdateCalendarName],
    }))
  const handleSaleEnddateCalendar = () =>
    setShowCalendar((prev) => ({
      ...prev,
      [saleEnddateCalendarName]: !prev[saleEnddateCalendarName],
    }))

  useEffect(() => {
    reset({
      [saleStartdateCalendarName]: isDate(selectedDate[saleStartdateCalendarName])
        ? formatyyyyMMddWithHyphen(selectedDate[saleStartdateCalendarName])
        : selectedDate[saleStartdateCalendarName],
      [saleEnddateCalendarName]: isDate(selectedDate[saleEnddateCalendarName])
        ? formatyyyyMMddWithHyphen(selectedDate[saleEnddateCalendarName])
        : selectedDate[saleEnddateCalendarName],
    })
  }, [selectedDate])
  return (
    <section>
      <dl>
        <dt>판매시작일</dt>
        <dd onClick={handleSaleStartdateCalendar}>
          <input
            type='text'
            {...register('saleStartdate')}
            disabled
            style={{ background: 'white', border: '1px solid #c0c6cf', color: 'black' }}
          />

          <span className='ex'>예) 2022-01-26</span>
        </dd>
      </dl>
      <dl>
        <dt>판매종료일</dt>
        <dd onClick={handleSaleEnddateCalendar}>
          <input
            type='text'
            {...register('saleEnddate')}
            disabled
            style={{ background: 'white', border: '1px solid #c0c6cf', color: 'black' }}
          />
          <span className='ex'>
            예) 2022-01-26 [선택입력] 입력하지 않으면 계속 판매로 간주합니다.
          </span>
        </dd>
      </dl>
      <Calendar top={`${top}px`} left={'490px'} calendarName={saleStartdateCalendarName} />
      <Calendar
        top={`${Number(top) + 57}px`}
        left={'490px'}
        calendarName={saleEnddateCalendarName}
      />
    </section>
  )
}
