import {
  cleaningDayCountAtom,
  cleaningStandardDateAtom,
} from '@state/cleaningManagement/cleaningStatus'
import { today } from '@util/common/dateUtil'
import { getReservationSchedulerDateArray } from '@util/reservation/reservation'
import { useRecoilValue } from 'recoil'
import Day from '../ReservationStatus/TableHeader/Day'

export default function CleaningSchedulerHeader() {
  const standardDate = useRecoilValue(cleaningStandardDateAtom)
  const dayCount = useRecoilValue(cleaningDayCountAtom)

  const reservationSchedulerDateArray = getReservationSchedulerDateArray(
    standardDate,
    dayCount,
    today
  )
  return (
    <div className='scheduler-header dF-f'>
      <div className='room-tit'>타입/객실</div>
      <div className='date-row dF-f'>
        {reservationSchedulerDateArray.map((dayData, index) => (
          <Day key={index} {...dayData} />
        ))}
      </div>
    </div>
  )
}
