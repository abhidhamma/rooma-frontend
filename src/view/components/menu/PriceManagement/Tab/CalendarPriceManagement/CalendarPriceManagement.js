import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
import {
  calendarPriceManagementCurrentMonthAtom,
  readCalendarRoomPriceListSelector,
  updateCalendarRoomPriceListSelector,
} from '@state/priceManagement/calendarPriceManagement'
import { currentPeriodPriceManagementRoomTypeAtom } from '@state/priceManagement/periodPriceManagement'
import { formatMMdd, formatMW, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { getDay, getYear, setMonth, setYear, startOfMonth } from 'date-fns'
import { addYears, addDays } from 'date-fns/fp'
import _ from 'lodash/fp'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import RoomTypeSelect from '../../common/RoomTypeSelect'
import Week from './Week'

export default function CalendarPriceManagement({ isCalendarPriceManagementTab }) {
  console.log('CalendarPriceManagement')
  const updateCalendarRoomPriceListCallback = useApiCallback('updateCalendarRoomPriceListCallback')
  const { name: accommodationName, acNo } = useRecoilValue(currentAccommodationAtom)
  const { rtNo } = useRecoilValue(currentPeriodPriceManagementRoomTypeAtom)
  const [selectedMonth, setSelectedMonth] = useRecoilState(calendarPriceManagementCurrentMonthAtom)
  const today = new Date()

  const { currentMonthDateArray, calendarStartDate, calendarEndDate } =
    makeCurrentMonthDateArray(selectedMonth)

  const {
    data: {
      data: { list: currentMonthPriceList },
    },
  } = useRecoilValue(
    readCalendarRoomPriceListSelector({
      rtNo,
      startDate: formatyyyyMMddWithHyphen(calendarStartDate),
      endDate: formatyyyyMMddWithHyphen(calendarEndDate),
    })
  )

  const makeDefaultValues = () => {
    let tempDefaultValues = {}
    const eachMonthPriceList = _.each((roomPrice) => {
      const { targetDate, originPrice, salePrice, providePrice } = roomPrice
      const MMdd = formatMMdd(stringToDate(targetDate))
      tempDefaultValues = {
        ...tempDefaultValues,
        [`originPrice${MMdd}`]: originPrice,
        [`salePrice${MMdd}`]: salePrice,
        [`providePrice${MMdd}`]: providePrice,
      }
    })
    eachMonthPriceList(currentMonthPriceList)
    return tempDefaultValues
  }
  const defaultValues = makeDefaultValues()
  console.log(defaultValues)

  console.log(currentMonthPriceList)

  const { register, reset, handleSubmit } = useForm()

  useEffect(() => {
    reset({ ...defaultValues })
    return () => {
      reset()
    }
  }, [selectedMonth, rtNo, currentMonthPriceList])

  const onSubmit = _.flow(
    preprocessSubmitData(calendarStartDate, acNo, rtNo),
    updateCalendarRoomPriceList(updateCalendarRoomPriceListCallback)
  )

  return (
    <div id='priceTab3' className={`tabcontent ${isCalendarPriceManagementTab ? 'current' : ''}`}>
      <div className='calendarWrap mgb_40 mgt_30'>
        <div className='info'>
          <dl>
            <dt>숙소명 : </dt>
            <dd>{accommodationName}</dd>
          </dl>
          <dl>
            <dt>객실타입 : </dt>
            <dd>
              <Suspense fallback={<div></div>}>
                <RoomTypeSelect />
              </Suspense>
            </dd>
          </dl>
        </div>
      </div>

      <div className='periodWrap mgt_30 mgb_40'>
        <div className='year'>
          <select
            value={getYear(selectedMonth)}
            onChange={(event) => handleYear(setSelectedMonth)(event)}
          >
            {makeYears(today).map((year, index) => (
              <option key={index} value={year}>{`${year}년`}</option>
            ))}
          </select>
        </div>
        <div className='month'>
          <button
            type='button'
            className='prev'
            onClick={() => subtractYear(today, selectedMonth, setSelectedMonth)}
          >
            <span className='hdn'>이전년</span>
          </button>
          {makeMonths(selectedMonth).map((month, index) => (
            <a
              key={index}
              href='#'
              className={formatMW(selectedMonth) === month ? 'selected' : ''}
              onClick={() => changeMonth(Number(month.replace('월', '')), setSelectedMonth)}
            >
              {month}
            </a>
          ))}

          <button
            type='button'
            className='next'
            onClick={() => addYear(today, selectedMonth, setSelectedMonth)}
          >
            <span className='hdn'>다음년</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <h4>날짜별 객실 요금</h4>
          <div className='ex-txt v1 mgb_15'>
            <p>
              달력에 요금이 안보이시면, <strong>기간별 요금을 먼저 설정</strong>해 주세요.
            </p>
          </div>
          <table>
            <caption>요일별 요금</caption>
            <colgroup>
              <col width='*' />
              <col width='13%' />
              <col width='13%' />
              <col width='13%' />
              <col width='13%' />
              <col width='13%' />
              <col width='13%' />
              <col width='13%' />
            </colgroup>
            <tbody>
              <tr>
                <th>구분</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th className='red-txt'>토</th>
                <th className='red-txt'>일</th>
              </tr>

              {currentMonthDateArray.map((currentWeek, index) => (
                <Week register={register} week={currentWeek} key={index} />
              ))}
            </tbody>
          </table>
          <div className='right mgt_20'>
            <button type='submit' className='btn purple btn-middle'>
              날짜별 객실요금 변경
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}
const makeCurrentMonthDateArray = (selectedMonth) => {
  //이번달의 1일
  const firstDate = startOfMonth(selectedMonth)
  //이번달의 1일의 요일(일요일이0)
  const firstDay = Number(getDay(firstDate))
  //달력의시작날짜
  const calendarStartDate = addDays(-(firstDay - 1))(firstDate)
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
  const calendarEndDate = addDays(34)(calendarStartDate)
  return { currentMonthDateArray, calendarStartDate, calendarEndDate }
}
const subtractYear = (today, selectedMonth, setSelectedMonth) => {
  const subtractOneYears = addYears(-1)
  if (getYear(today) === getYear(selectedMonth)) {
    alert('현재년도 이전으로 설정할 수 없습니다.')
  } else {
    setSelectedMonth((prev) => subtractOneYears(prev))
  }
}
const addYear = (today, selectedMonth, setSelectedMonth) => {
  const addOneYears = addYears(1)
  const addThreeYears = addYears(3)
  if (getYear(addThreeYears(today)) === getYear(selectedMonth)) {
    alert(`${getYear(selectedMonth)}년 이후로 설정할 수 없습니다.`)
  } else {
    setSelectedMonth((prev) => addOneYears(prev))
  }
}

const makeYears = (today) => {
  const tempYearsArray = []
  const getYears = () => 4
  const range = (number) => _.range(0)(number)
  const makeYear = (number) => getYear(addYears(number)(today))
  const eachYear = _.each((number) => {
    tempYearsArray.push(makeYear(number))
  })
  _.flow(getYears, range, eachYear)()
  return tempYearsArray
}
const handleYear = (setSelectedMonth) => (event) => {
  const year = event.target.value
  setSelectedMonth((prev) => setYear(prev, year))
}

const makeMonths = (selectedMonth) => {
  const tempMonthsArray = []
  const getMonths = () => 12
  const range = (number) => _.range(0)(number)
  const eachMonth = _.each((number) => {
    tempMonthsArray.push(formatMW(setMonth(selectedMonth, number)))
  })
  _.flow(getMonths, range, eachMonth)()

  return tempMonthsArray
}

const changeMonth = (month, setSelectedMonth) => {
  setSelectedMonth((prev) => setMonth(prev, month - 1))
}
const preprocessSubmitData = (calendarStartDate, acNo, rtNo) => (submitData) => {
  let jsonData = {}

  const roomPrices = []

  let dayCount = 0
  for (let i = 0; i < 35; i++) {
    const addIDays = addDays(dayCount)
    const currentDate = addIDays(calendarStartDate)
    const targetDate = formatyyyyMMddWithHyphen(currentDate)
    const suffix = formatMMdd(currentDate)
    const originPrice = submitData[`originPrice${suffix}`]
    const salePrice = submitData[`salePrice${suffix}`]
    const providePrice = submitData[`providePrice${suffix}`]

    dayCount += 1
    roomPrices.push({ targetDate, originPrice, salePrice, providePrice })
  }
  jsonData = { acNo, rtNo, roomPrices }
  return jsonData
}
const updateCalendarRoomPriceList = (updateCalendarRoomPriceListCallback) => (jsonData) => {
  updateCalendarRoomPriceListCallback(updateCalendarRoomPriceListSelector(jsonData)).then(
    (result) => {
      const { message } = result
      if (message === '업데이트 성공') {
        alert('객실요금이 변경되었습니다.')
      } else {
        alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
      }
    }
  )
}
