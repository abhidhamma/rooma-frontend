import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  addyyyyMMdd,
  betweenyyyyMMdd,
  formatMMddE,
  formatyyyyMMdd,
  stringToDate,
} from '@util/common/dateUtil'
import { getDateArray } from '@util/reservation/reservation'
import { displayAtom, standardDateAtom } from '@state/reservation'

function ReservationOverlay({ data, drag, dayCount, currentDate }) {
  console.log(data)
  const setDisplay = useSetRecoilState(displayAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const checkIn = formatMMddE(stringToDate(data.checkIn))
  const checkOut = formatMMddE(stringToDate(data.checkOut))
  const night = betweenyyyyMMdd(data.checkIn, data.checkOut)
  let length = betweenyyyyMMdd(data.checkIn, data.checkOut)

  //달력끝을 넘어가는 경우 길이를 줄인다
  const originalTailDate = addyyyyMMdd(data.checkIn, length)
  const endDate = addyyyyMMdd(formatyyyyMMdd(standardDate), dayCount)
  const gap = betweenyyyyMMdd(originalTailDate, endDate)
  if (gap < 0) {
    //음수일경우 넘치는것이므로 길이를 짧게 해주기위해 더해준다
    length = length + gap
  }

  //이전달력에서 이어지는 경우 길이를 줄인다
  let reservationDateArray = []
  if (data !== undefined) {
    reservationDateArray = getDateArray(data.checkIn, data.checkOut)
  }

  //걸쳐있는 예약인지 확인하려면 endDate, endDate+1 둘다 들어있는 array면 된다
  const startDate = formatyyyyMMdd(standardDate)
  const prevEndDate = addyyyyMMdd(startDate, -1)

  if (
    reservationDateArray.indexOf(startDate) > -1 &&
    reservationDateArray.indexOf(prevEndDate) > -1 &&
    currentDate === startDate
  ) {
    //여기서 length를 바꾸면 된다
    let originLength = betweenyyyyMMdd(data.checkIn, data.checkOut) // 4 // 2
    let prevLength = betweenyyyyMMdd(data.checkIn, startDate) // 3 // 1
    length = originLength - prevLength
  }

  const showInfo = () => {
    setDisplay({
      display: 'block',
      name: data.data,
      dateInfo: {
        checkIn,
        checkOut,
        night,
      },
    })
  }
  const hideInfo = () => {
    setDisplay({
      display: 'none',
      name: data.data,
      dateInfo: {
        checkIn,
        checkOut,
        night,
      },
    })
  }
  return (
    <div
      onMouseEnter={showInfo}
      onMouseLeave={hideInfo}
      ref={drag}
      style={{
        display: 'grid',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `calc(${length}00% + ${length}px)`,
        zIndex: 1,
        backgroundColor: '#34C38F',
        color: 'white',
      }}
    >
      <div style={{ placeSelf: 'center' }}>{data.userName}</div>
    </div>
  )
}

export default ReservationOverlay
