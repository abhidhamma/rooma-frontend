import {
  cleaningDayCountAtom,
  cleaningStandardDateAtom,
} from '@state/cleaningManagement/cleaningStatus'
import { formatyyyyMMdd, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { addDays } from 'date-fns'
import _ from 'lodash/fp'
import { useRecoilValue } from 'recoil'
import Cell from './Cell'

export default function Room({ room, rtNo, rmNo }) {
  const cleaning = room.cleanings
  const standardDate = useRecoilValue(cleaningStandardDateAtom)
  const dayCount = useRecoilValue(cleaningDayCountAtom)

  const currentCalendarList = calculateCurrentCalendar(cleaning, standardDate, dayCount)
  return (
    <div className='dF-f'>
      {currentCalendarList.map((day, index) => {
        const currentDate = day.targetDate
        const currentCleaningRoom = day.cleaningRoom
        return (
          <Cell
            key={index}
            currentDate={currentDate}
            cleaning={currentCleaningRoom}
            rtNo={rtNo}
            rmNo={rmNo}
          />
        )
      })}
      {/* <div className='clean-info'>
        <a href='#' className='clean-state start'>
          청소요청
        </a>
        <select>
          <option>담당자선택</option>
        </select>
      </div>
      <div className='clean-info'>
        <a href='#' className='clean-state ing'>
          청소중
        </a>
        <select>
          <option>담당자선택</option>
        </select>
      </div>
      <div className='clean-info'>
        <a href='#' className='clean-state ready'>
          요청전
        </a>
        <select>
          <option>담당자선택</option>
        </select>
      </div>
      <div className='clean-info'>
        <a href='#' className='clean-state finish'>
          청소완료
        </a>
        <select>
          <option>담당자선택</option>
        </select>
      </div>
      <div className='clean-info'>
        <a href='#' className='clean-state ing'>
          청소중
        </a>
        <select>
          <option>담당자선택</option>
        </select>
      </div> */}
    </div>
  )
}
const calculateCurrentCalendar = (cleaning, standardDate, dayCount) => {
  //보여질 날짜 만들기
  const displayDays = dayCount
  const mapDate = _.map((number) => ({
    targetDate: formatyyyyMMddWithHyphen(addDays(standardDate, number - 1)),
  }))
  const monthDateList = _.flow(numberToArray, mapDate)(displayDays)
  const calendarList = monthDateList

  for (let i = 0; i < calendarList.length; i++) {
    const { targetDate } = calendarList[i]

    //달력에 청소중인방 포함시키기
    for (let j = 0; j < cleaning.length; j++) {
      const cleaningRoom = cleaning[j]
      const workDate = cleaningRoom.workDate

      if (targetDate === workDate) {
        calendarList[i] = { ...calendarList[i], cleaningRoom }
      }
    }
  }
  return calendarList
}
