import { toDate } from 'date-fns'
import { addDays, formatWithOptions } from 'date-fns/fp'
import { ko } from 'date-fns/locale'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { dayCountAtom, displayAtom, isDisplayCreateReservationAtom, reservationListAtom, roomTypeListAtom, standardDateAtom } from '../../data/state'
import { addDate, betweenDate, stringToDate } from '../../other/util/dateUtil'
import CreateReservation from './CreateReservation'
import ReservationInfo from './ReservationInfo'
import ReservationScheulerHeader from './ReservationScheuler/ReservationScheulerHeader'
import RoomType from './RoomType/RoomType'

export default function Container() {
  const [dayCount, setDayCount] = useRecoilState(dayCountAtom)
  const [roomTypeList, setRoomTypeList] = useRecoilState(roomTypeListAtom)
  const [reservationList, setReservationList] = useRecoilState(reservationListAtom)
  const [display, setDisplay] = useRecoilState(displayAtom)
  const [isDisplayCreateReservation, setIsDisplayCreateReservation] = useRecoilState(isDisplayCreateReservationAtom)
  const [standardDate, setStandardDate] = useRecoilState(standardDateAtom)

  const formatToday = formatWithOptions({ locale: ko }, 'yyyy.MM.dd(E)')
  const today = formatToday(standardDate)

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

  console.log(reservationList)
  console.log(roomTypeList)
  // const t1 = new Date()
  // const t2 = addDate(new Date(), 1)
  // console.log(t1)
  // console.log(t2)
  // console.log(betweenDate(t1, t2))

  return (
    <>
      <section>{isDisplayCreateReservation && <CreateReservation />}</section>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='full-content reserv-state'>
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
          <div className='timetable'>
            <ReservationScheulerHeader />
            {/* <a href='#' className='reArea st5' style={{ width: 'calc(200% + 2px)', left: '0px', display: 'block' }}>
                홍길동
              </a> */}
            {/* <a href='#' className='reArea st1' style={{ width: 'calc(300% + 3px)', left: '0px', display: 'block' }}>
                홍길동
              </a> */}
            <div className='scheduler-view'>
              {roomTypeList.map((roomType, index) => {
                return <RoomType key={index} roomType={roomType} />
              })}
              {/* <!-- S:layer --> */}
              <ReservationInfo display={display} />
              {/* <!-- E:layer --> */}
            </div>
          </div>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
