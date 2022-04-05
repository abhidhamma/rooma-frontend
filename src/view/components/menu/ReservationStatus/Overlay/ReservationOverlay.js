import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  addyyyyMMdd,
  betweenyyyyMMdd,
  formatMMddE,
  formatyyyyMMdd,
  stringToDate,
} from '@util/common/dateUtil'
import { getDateArray } from '@util/reservation/reservation'
import { displayAtom, isDisplayReadReservationAtom, standardDateAtom } from '@state/reservation'
import { readReservationParameterAtom } from '@state/reservationStatus/reservationStatus'
import { dimmdLayerAtom } from '@state/common/common'

function ReservationOverlay({ data, drag, dayCount, currentDate, roomNumber }) {
  const setDisplay = useSetRecoilState(displayAtom)
  const setIsDisplayReadReservation = useSetRecoilState(isDisplayReadReservationAtom)
  const setReadReservationParameter = useSetRecoilState(readReservationParameterAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  const checkIn = formatMMddE(stringToDate(data.checkIn))
  const checkOut = formatMMddE(stringToDate(data.checkOut))
  const night = betweenyyyyMMdd(data.checkIn, data.checkOut)
  const rrNo = data.rrNo
  const rmNo = data.rmNo
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

  const reserveStatus = data?.reserveStatus

  const backgroundColor = makeReservationColor(reserveStatus)

  const showInfo = () => {
    setTimeout(function () {
      setDisplay({
        display: 'block',
        data,
        roomNumber,
      })
    }, 200)
  }
  const hideInfo = () => {
    setDisplay({
      display: 'none',
    })
  }

  const handleReadReservationPopup = () => {
    setReadReservationParameter({ rrNo, rmNo })
    setIsDisplayReadReservation(true)
    setIsShowDimmdLayer(true)

    setTimeout(function () {
      setDisplay({
        display: 'none',
      })
    }, 250)
  }
  return (
    <div
      onClick={showInfo}
      onMouseLeave={hideInfo}
      onDoubleClick={handleReadReservationPopup}
      ref={drag}
      style={{
        display: 'grid',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `calc(${length}00% + ${length}px)`,
        zIndex: 1,
        backgroundColor: backgroundColor,
        color: 'white',
      }}
    >
      <div style={{ placeSelf: 'center' }}>{`${data.userName} ${rrNo}`}</div>
    </div>
  )
}
export const makeReservationColor = (reserveStatus) => {
  let color = ''
  if (reserveStatus === 'CHECKOUT') {
    color = '#f46a6a'
  } else if (reserveStatus === 'CHECKIN') {
    color = '#50a5f1'
  } else if (reserveStatus === 'CLEANING') {
    color = '#ff6dd1'
  } else {
    color = '#34C38F'
  }
  return color
}
export default ReservationOverlay
