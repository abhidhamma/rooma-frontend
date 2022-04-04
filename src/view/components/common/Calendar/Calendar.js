import { selectedDateAtom, showCalendarAtom } from '@state/common/calendar'
import { formatyyyyMM, WithoutTime } from '@util/common/dateUtil'
import { getDay, startOfMonth } from 'date-fns'
import { addMonths, addDays } from 'date-fns/fp'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Week from './Week'

export default function Calendar({ top, left, calendarName, defaultDate }) {
  const [selectedMonth, setSelectedMonth] = useState(WithoutTime(new Date()))
  const setSelectedDate = useSetRecoilState(selectedDateAtom)
  const showCalendar = useRecoilValue(showCalendarAtom)

  const currentMonthDateArray = makeCurrentMonthDateArray(selectedMonth)

  const subtractMonth = () => {
    const subtractOneMonths = addMonths(-1)
    return setSelectedMonth((prev) => subtractOneMonths(prev))
  }
  const addMonth = () => {
    const addOneMonths = addMonths(1)
    return setSelectedMonth((prev) => addOneMonths(prev))
  }

  useEffect(() => {
    setSelectedDate((prev) => ({ ...prev, [calendarName]: defaultDate }))
  }, [])

  return (
    <div
      className='quick-layer sel-date'
      style={{ width: '240px', top, left, display: showCalendar[calendarName] ? 'block' : 'none' }}
    >
      <div className='tit'>
        <a href='#' className='month-prev' onClick={subtractMonth}>
          <span className='hdn'>이전달</span>
        </a>
        <div className='month'>{formatyyyyMM(selectedMonth)}</div>
        <a href='#' className='month-next' onClick={addMonth}>
          <span className='hdn'>다음달</span>
        </a>
      </div>
      <div className='dateArea'>
        <table>
          <caption>datepicker</caption>
          <colgroup>
            <col width='14.2%' />
            <col width='14.2%' />
            <col width='14.2%' />
            <col width='14.2%' />
            <col width='14.2%' />
            <col width='14.2%' />
            <col width='*' />
          </colgroup>
          <thead>
            <tr>
              <th className='sun'>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th className='sat'>토</th>
            </tr>
          </thead>
          <tbody>
            {currentMonthDateArray.map((currentWeek, index) => (
              <Week week={currentWeek} calendarName={calendarName} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
const makeCurrentMonthDateArray = (selectedMonth) => {
  //이번달의 1일
  const firstDate = startOfMonth(selectedMonth)
  //이번달의 1일의 요일(일요일이0)
  const firstDay = Number(getDay(firstDate))
  //달력의시작날짜
  const calendarStartDate = addDays(-firstDay)(firstDate)
  // 달력의 시작일~끝일 만들기
  const currentMonthDateArray = []

  let dayCount = 0
  for (let i = 0; i < 5; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      const addIDays = addDays(dayCount)
      const currentDate = addIDays(calendarStartDate)
      week.push(currentDate)
      dayCount += 1
    }
    currentMonthDateArray.push(week)
  }
  return currentMonthDateArray
}
