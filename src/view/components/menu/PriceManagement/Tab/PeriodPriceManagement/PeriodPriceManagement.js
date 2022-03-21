import Calendar from '@components/common/Calendar'
import { selectedDateAtom } from '@state/common/calendar'
import { currentAccommodationAtom } from '@state/common/common'
import { formatLong } from '@util/common/dateUtil'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import RoomBasicPrice from './RoomBasicPrice'
import RoomTypeSelect from '../../common/RoomTypeSelect'
import PeriodPriceManagementWeekPrices from './PeriodPriceManagementWeekPrices'

export default function PeriodPriceManagement({ isPeriodPriceManagementTab }) {
  const { name: accommodationName } = useRecoilValue(currentAccommodationAtom)
  const selectedDate = useRecoilValue(selectedDateAtom)

  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false)
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false)

  const handleStartDateCalendar = () => setShowStartDateCalendar((prev) => !prev)
  const handleEndDateCalendar = () => setShowEndDateCalendar((prev) => !prev)

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
                value={formatLong(selectedDate.startDate)}
                disabled
              />
            </div>
            <div className='mgl_5 mgr_5 date' onClick={handleEndDateCalendar}>
              <span>변경마지막일</span>
              <input
                type='text'
                style={{ background: 'white' }}
                value={formatLong(selectedDate.endDate)}
                disabled
              />
            </div>
          </dd>
        </dl>
        <Calendar show={showStartDateCalendar} left={'137px'} dateName={'startDate'} />
        <Calendar show={showEndDateCalendar} left={'382px'} dateName={'endDate'} />
      </div>
      <RoomBasicPrice />
      <PeriodPriceManagementWeekPrices />
    </div>
  )
}
