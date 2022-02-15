import { addDays, formatWithOptions } from 'date-fns/fp'
import { ko } from 'date-fns/locale'
import { useRecoilState } from 'recoil'
import { displayAtom } from '../../../data/state'

export default function ReservationOverlay({ data, drag, date }) {
  const [display, setDisplay] = useRecoilState(displayAtom)
  const length = data.endIndex - data.startIndex + 1
  const dateToKorea = formatWithOptions({ locale: ko }, 'MM.dd(E)')

  const addDaysLength = addDays(length)
  const startDate = new Date(date)
  const startDateLocale = dateToKorea(startDate)
  const endDateLocale = dateToKorea(addDaysLength(startDate))

  const showInfo = () => {
    setDisplay({
      display: 'block',
      name: data.data,
      dateInfo: {
        startDateLocale,
        endDateLocale,
        night: length,
      },
    })
  }
  const hideInfo = () => {
    setDisplay({
      display: 'none',
      name: data.data,
      dateInfo: {
        startDateLocale,
        endDateLocale,
        night: length,
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
