import { addDays, formatWithOptions, isSaturday, isSunday } from 'date-fns/fp'
import { format } from 'date-fns/fp'
import { ko } from 'date-fns/locale'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dayCountAtom, standardDateAtom } from '../../../data/state'
import Day from './Day'

export default function ReservationScheulerHeader() {
  const [standardDate, setStandardDate] = useRecoilState(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)

  const today = new Date()
  const dayArr = []
  for (let i = 0; i < dayCount; i++) {
    const formatddE = formatWithOptions({ locale: ko }, 'dd.E')
    const formatyyyyMMdd = formatWithOptions({ locale: ko }, 'yyyyMMdd')
    const addDay = addDays(i)
    const currentDate = addDay(standardDate)
    const currentDateIsToday = formatyyyyMMdd(currentDate) === formatyyyyMMdd(today)
    const currentDateIsSaturday = isSaturday(currentDate)
    const currentDateIsSunday = isSunday(currentDate)
    const ddE = formatddE(currentDate).split('.')
    const dd = ddE[0]
    const E = ddE[1]
    dayArr.push({ day: dd, dayOfWeek: E, isToday: currentDateIsToday, isSaturday: currentDateIsSaturday, isSunday: currentDateIsSunday })
  }

  const makeReservationScheulerHeader = () => {}

  return (
    <div className='scheduler-header dF-f'>
      <div className='room-tit'>타입/객실</div>
      <div className='date-row dF-f'>
        {dayArr.map((dayData, index) => (
          <Day key={index} {...dayData} />
        ))}
      </div>
    </div>
  )
}
