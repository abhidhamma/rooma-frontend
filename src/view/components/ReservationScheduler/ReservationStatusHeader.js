import { addDays } from 'date-fns/fp'
import { useRecoilState } from 'recoil'
import { formatyyyyMMddE } from '../../../other/util/common/dateUtil'
import { dayCountAtom, standardDateAtom } from '../../../service/state/reservation'

export default function ReservationStatusHeader() {
  const [dayCount, setDayCount] = useRecoilState(dayCountAtom)
  const [standardDate, setStandardDate] = useRecoilState(standardDateAtom)
  const today = formatyyyyMMddE(standardDate)

  const goNext = () => {
    const addDayCount = addDays(dayCount)
    setStandardDate(addDayCount(standardDate))
  }
  const goPrev = () => {
    const addDayCount = addDays(-dayCount)
    setStandardDate(addDayCount(standardDate))
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
        <h3>예약현황</h3>
      </div>
      <div className='date-selectWrap dF-s'>
        <div className='date-view'>
          <button type='button' className={dayCount === 7 ? 'btn btn-middle gray active' : 'btn btn-middle gray'} onClick={() => handleDayCount(7)}>
            7일보기
          </button>
          <button type='button' className={dayCount === 15 ? 'btn btn-middle gray active' : 'btn btn-middle gray'} onClick={() => handleDayCount(15)}>
            15일보기
          </button>
          <button type='button' className={dayCount === 30 ? 'btn btn-middle gray active' : 'btn btn-middle gray'} onClick={() => handleDayCount(30)}>
            30일보기
          </button>
          <button type='button' className={dayCount === 1 ? 'btn btn-middle gray active' : 'btn btn-middle gray'} onClick={() => handleDayCount(1)}>
            오늘
          </button>
        </div>
        <div className='today-date'>
          <button type='button' className='prev' onClick={goPrev}>
            <span className='hdn'>이전</span>
          </button>
          <span className='today'>{today}</span>
          <button type='button' className='next' onClick={goNext}>
            <span className='hdn'>다음</span>
          </button>
        </div>
        <div className='item-state'>
          <div>
            <span className='st1'></span>미입금 잔금
          </div>
          <div>
            <span className='st2'></span>요청 완료
          </div>
          <div>
            <span className='st3'></span>입실
          </div>
          <div>
            <span className='st4'></span>퇴실
          </div>
          <div>
            <span className='st5'></span>미입금퇴실
          </div>
        </div>
      </div>
    </>
  )
}
