import {
  cleaningDayCountAtom,
  cleaningStandardDateAtom,
} from '@state/cleaningManagement/cleaningStatus'
import { currentAccommodationAtom } from '@state/common/common'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import { formatyyyyMMddE } from '@util/common/dateUtil'
import { addDays } from 'date-fns/fp'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function CleaningStatusHeader() {
  const [dayCount, setDayCount] = useRecoilState(cleaningDayCountAtom)
  const [standardDate, setStandardDate] = useRecoilState(cleaningStandardDateAtom)
  const today = formatyyyyMMddE(standardDate)

  const accommodation = useRecoilValue(currentAccommodationAtom)

  // const parameter = {
  //   acNo: accommodation?.acNo,
  //   startDate: formatyyyyMMddWithHyphen(standardDate),
  //   endDate: formatyyyyMMddWithHyphen(addDays(29)(standardDate)),
  // }

  // const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
  //   readReservationPriceSelector(parameter)
  // )

  const goNext = () => {
    const addDayCount = addDays(dayCount)
    setStandardDate(addDayCount(standardDate))
    //   resetReadReservationPrice()
  }
  const goPrev = () => {
    const addDayCount = addDays(-dayCount)
    setStandardDate(addDayCount(standardDate))
    //   resetReadReservationPrice()
  }

  const handleDayCount = (count) => {
    setDayCount(count)

    if (count === 1) {
      setStandardDate(new Date())
    }
  }
  return (
    <>
      <div className='titWrap'>
        <h3>청소현황</h3>
      </div>
      <div className='date-selectWrap dF-s'>
        <div className='date-view'>
          <button
            type='button'
            className={dayCount === 5 ? 'btn btn-middle gray active' : 'btn btn-middle gray'}
            onClick={() => handleDayCount(5)}
          >
            5일보기
          </button>
          <button
            type='button'
            className={dayCount === 1 ? 'btn btn-middle gray active' : 'btn btn-middle gray'}
            onClick={() => handleDayCount(1)}
          >
            오늘
          </button>
        </div>
        <div className='today-date'>
          <button type='button' className='prev' onClick={goPrev}>
            <span className='hdn'>이전일</span>
          </button>
          <span className='today'>{today}</span>
          <button type='button' className='next' onClick={goNext}>
            <span className='hdn'>다음일</span>
          </button>
        </div>
        <div className='item-state' style={{ width: '215px' }}></div>
      </div>
    </>
  )
}
