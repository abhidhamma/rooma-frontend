import Calendar from '@components/common/Calendar'
import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { currentAccommodationAtom } from '@state/common/common'
import { formatLong } from '@util/common/dateUtil'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import RoomBasicPrice from './RoomBasicPrice'
import RoomTypeSelect from '../../common/RoomTypeSelect'
import PeriodPriceManagementWeekPrices from './PeriodPriceManagementWeekPrices'
import { useForm } from 'react-hook-form'
import { isDate } from 'date-fns'

export default function PeriodPriceManagement({ isPeriodPriceManagementTab }) {
  const { name: accommodationName } = useRecoilValue(currentAccommodationAtom)
  const selectedDate = useRecoilValue(selectedDateAtom)

  const { register, reset } = useForm()

  const setShowCalendar = useSetRecoilState(showCalendarAtom)
  const startDateCalendarName = 'startDate'
  const endDateCalendarName = 'endDate'

  const handleStartDateCalendar = () =>
    setShowCalendar((prev) => ({ ...prev, [startDateCalendarName]: !prev[startDateCalendarName] }))
  const handleEndDateCalendar = () =>
    setShowCalendar((prev) => ({ ...prev, [endDateCalendarName]: !prev[endDateCalendarName] }))

  useEffect(() => {
    reset({
      startDate: isDate(selectedDate?.startDate)
        ? formatLong(selectedDate.startDate)
        : selectedDate.startDate,
      endDate: isDate(selectedDate?.endDate)
        ? formatLong(selectedDate.endDate)
        : selectedDate.endDate,
    })
  }, [selectedDate])
  return (
    <div id='priceTab2' className={`tabcontent ${isPeriodPriceManagementTab ? 'current' : ''}`}>
      <div className='calendarWrap mgb_40 mgt_30'>
        <div className='info'>
          <dl>
            <dt>숙소명 : </dt>
            <dd>{accommodationName}</dd>
          </dl>
          <dl>
            <dt>객실타입 : </dt>
            <dd>
              <RoomTypeSelect />
            </dd>
          </dl>
        </div>
        <dl className='period mgt_10'>
          <dt>적용기간 :</dt>
          <dd>
            <div className='mgl_5 date' onClick={handleStartDateCalendar}>
              <span>변경시작일</span>
              <input
                type='text'
                style={{ background: 'white' }}
                defaultValue={'선택해주세요'}
                {...register('startDate')}
                disabled
              />
            </div>
            <div className='mgl_5 mgr_5 date' onClick={handleEndDateCalendar}>
              <span>변경마지막일</span>
              <input
                type='text'
                style={{ background: 'white' }}
                defaultValue={'선택해주세요'}
                {...register('endDate')}
                disabled
              />
            </div>
          </dd>
        </dl>
        <Calendar left={'137px'} calendarName={startDateCalendarName} />
        <Calendar left={'382px'} calendarName={endDateCalendarName} />
      </div>
      <RoomBasicPrice />
      <PeriodPriceManagementWeekPrices />
    </div>
  )
}
