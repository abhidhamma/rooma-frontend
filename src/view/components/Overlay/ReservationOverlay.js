import { useRecoilState, useRecoilValue } from 'recoil'
import { displayAtom, standardDateAtom } from '../../../data/state'
import { addyyyyMMdd, betweenyyyyMMdd, formatMMddE, formatyyyyMMdd, stringToDate } from '../../../other/util/dateUtil'

export default function ReservationOverlay({ data, drag, dayCount, currentDate }) {
  const [display, setDisplay] = useRecoilState(displayAtom)
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

  const getReservationDateArray = (reservation) => {
    const checkIn = reservation?.checkIn
    const checkOut = reservation?.checkOut
    if (reservation === undefined && checkIn === undefined && checkOut === undefined) {
      return []
    }

    const reservationDateArray = []

    for (let i = checkIn; i !== checkOut; i = addyyyyMMdd(i, 1)) {
      reservationDateArray.push(i)
    }

    return reservationDateArray
  }

  console.log('start')
  //이전달력에서 이어지는 경우 길이를 줄인다
  const reservationDateArray = getReservationDateArray({ checkIn: data.checkIn, checkOut: data.checkOut })

  console.log(reservationDateArray)
  //걸쳐있는 예약인지 확인하려면 endDate, endDate+1 둘다 들어있는 array면 된다
  const startDate = formatyyyyMMdd(standardDate)
  const prevEndDate = addyyyyMMdd(startDate, -1)
  console.log(startDate)
  console.log(prevEndDate)
  console.log(currentDate === startDate)

  if (reservationDateArray.indexOf(startDate) > -1 && reservationDateArray.indexOf(prevEndDate) > -1 && currentDate === startDate) {
    //여기서 length를 바꾸면 된다
    let originLength = betweenyyyyMMdd(data.checkIn, data.checkOut) // 4 // 2
    let prevLength = betweenyyyyMMdd(data.checkIn, startDate) // 3 // 1
    length = originLength - prevLength

    console.log('originLength : ')
    console.log(originLength)

    console.log('prevLength : ')
    console.log(prevLength)
  }
  console.log('end')

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
      onMouseOver={showInfo}
      onMouseOut={hideInfo}
      ref={drag}
      style={{
        display: 'grid',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `calc(${length}00% + ${length}px)`,
        zIndex: 1,
        backgroundColor: data.color,
        color: 'white',
      }}>
      <div style={{ placeSelf: 'center' }}>{data.data}</div>
    </div>
  )
}
