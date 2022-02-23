// import { useRecoilValue } from 'recoil'
// import { addyyyyMMdd, formatyyyyMMdd } from '../../../../other/util/common/dateUtil'
// import { getDateArray } from '../../../../other/util/reservation/reservation'
// import { dayCountAtom, reservationListAtom, standardDateAtom } from '../../../../service/state/reservation/atom'
// import Price from './Price'

// export default function RoomReservation({ monthPrice, roomNumber }) {
//   const reservationList = useRecoilValue(reservationListAtom)
//   const standardDate = useRecoilValue(standardDateAtom)
//   const dayCount = useRecoilValue(dayCountAtom)

//   const firstIndex = monthPrice.findIndex((day) => formatyyyyMMdd(day.date) === formatyyyyMMdd(standardDate))
//   const lastIndex = firstIndex + (dayCount - 1)
//   const slicedMonthPrice = monthPrice.slice(firstIndex, lastIndex + 1)

//   const currentyyyyMMdd = formatyyyyMMdd(standardDate)
//   const endyyyyMMdd = addyyyyMMdd(currentyyyyMMdd, dayCount)
//   const currentCalendarDateArray = getDateArray(currentyyyyMMdd, endyyyyMMdd)
//   const slicedReservationList = reservationList.filter((reservation) => {
//     const reservationDateArray = getDateArray(reservation.checkIn, reservation.checkOut)
//     for (let i = 0; i < reservationDateArray.length; i++) {
//       const reservationDate = reservationDateArray[i]
//       if (currentCalendarDateArray.indexOf(reservationDate) > -1) {
//         return true
//       }
//     }
//     return false
//   })

//   return (
//     <>
//       {slicedMonthPrice.length === 0 ? (
//         <div>데이터가 없습니다.</div>
//       ) : (
//         <div className='dF-f'>
//           {slicedMonthPrice.map((day) => {
//             const dayId = day.id
//             const currentDate = formatyyyyMMdd(day.date)
//             const [currentReservation] = slicedReservationList.filter((reservation) => {
//               const isContain = getDateArray(reservation.checkIn, reservation.checkOut).indexOf(currentDate) > -1
//               return isContain && reservation.location === roomNumber
//             })

//             //standardDate와 dayCount로 이전달력에서 넘어와야하는 예약이 있는지 확인하고
//             //그걸 필요한 Price의 reservation에 주면된다
//             let isHangOnTwoCalendar = false
//             //걸쳐있는 예약인지 확인하려면 endDate, endDate+1 둘다 들어있는 array면 된다
//             let reservationDateArray = []
//             if (currentReservation !== undefined) {
//               reservationDateArray = getDateArray(currentReservation.checkIn, currentReservation.checkOut)
//             }

//             const startDate = formatyyyyMMdd(standardDate)
//             const prevEndDate = addyyyyMMdd(startDate, -1)

//             if (reservationDateArray.indexOf(startDate) > -1 && reservationDateArray.indexOf(prevEndDate) > -1 && currentDate === formatyyyyMMdd(standardDate)) {
//               isHangOnTwoCalendar = true
//             }

//             if (currentReservation?.checkIn === currentDate || isHangOnTwoCalendar) {
//               return <Price key={dayId} price={day.price} currentDate={currentDate} reservation={currentReservation} roomNumber={roomNumber} />
//             } else {
//               return <Price key={dayId} price={day.price} currentDate={currentDate} roomNumber={roomNumber} />
//             }
//           })}
//         </div>
//       )}
//     </>
//   )
// }
