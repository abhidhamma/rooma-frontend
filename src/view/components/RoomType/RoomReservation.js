import { formatWithOptions } from 'date-fns/fp'
import { ko } from 'date-fns/locale'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dayCountAtom, reservationListAtom, standardDateAtom } from '../../../data/state'
import Price from './Price'

export default function RoomReservation({ monthPrice }) {
  const [reservationList, setReservationList] = useRecoilState(reservationListAtom)
  const dayCount = useRecoilValue(dayCountAtom)
  const [standardDate, setStandardDate] = useRecoilState(standardDateAtom)
  console.log(monthPrice)
  const formatyyyyMMdd = formatWithOptions({ locale: ko }, 'yyyyMMdd')
  const firstIndex = monthPrice.findIndex((day) => formatyyyyMMdd(day.date) === formatyyyyMMdd(standardDate))
  const lastIndex = firstIndex + dayCount
  const slicedMonthPrice = monthPrice.slice(firstIndex, lastIndex + 1)

  return (
    <>
      {slicedMonthPrice.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <div className='dF-f'>
          {slicedMonthPrice.map((day, index) => {
            if (index < dayCount) {
              const dayId = day.id
              const [currentReservation] = reservationList.filter((reservation) => reservation.startIndex === dayId)

              if (reservationList.map((reservation) => reservation.startIndex).indexOf(dayId) > -1) {
                return <Price key={dayId} price={day.price} targetIndex={dayId} reservation={currentReservation} date={day.date} />
              } else {
                return <Price key={dayId} price={day.price} targetIndex={dayId} date={day.date} />
              }
            }
          })}
        </div>
      )}
    </>
  )
}
