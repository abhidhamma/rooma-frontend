import React from 'react'
import { getDateArray } from '@util/reservation/reservation'
import ReservationOverlay from '@components/menu/ReservationStatus/Overlay/ReservationOverlay'
import SourceOverlay from '@components/menu/ReservationStatus/Overlay/SourceOverlay'
import TargetOverlay from '@components/menu/ReservationStatus/Overlay/TargetOverlay'
import { formatyyyyMMdd, formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'

function PricePresenter({
  drop,
  reservation,
  currentDate,
  price,
  isDragging,
  isOver,
  handleCreateReservation,
  handleRightClickPopup,
  dayCount,
  drag,
  lockedRoom,
}) {
  //달력이 걸치는 경우? checkIn부터 checkOut까지의 값을 모두 넣고 indexOf로 currentDate와 동일한게 있는지 찾는다
  let reservationDateArray = []

  if (reservation !== undefined) {
    reservationDateArray = getDateArray(reservation?.checkIn, reservation?.checkOut)
  }

  return (
    <>
      <div ref={drop} onContextMenu={handleRightClickPopup(reservation)}>
        {lockedRoom?.lockDate === formatyyyyMMddWithHyphen(stringToDate(currentDate)) ? (
          <div className='lock'>
            <span className='hdn'>잠김</span>
          </div>
        ) : (
          <div style={{ display: 'grid', position: 'relative', width: '100%', height: '100%' }}>
            <a
              href='#'
              className={reservation?.checkIn === currentDate ? '' : 'none'}
              style={{ display: 'block', placeSelf: 'center' }}
              onClick={handleCreateReservation}
            >
              {`${price}만`}
            </a>
          </div>
        )}

        {/* reservation */}
        {reservationDateArray?.indexOf(currentDate) > -1 && !isDragging && (
          <ReservationOverlay
            data={reservation}
            drag={drag}
            dayCount={dayCount}
            currentDate={currentDate}
          />
        )}
        {/* hover overlay */}
        {isOver && <TargetOverlay />}
        {/* source overlay */}
        {isDragging && <SourceOverlay />}
      </div>
    </>
  )
}
// export default React.memo(PricePresenter)
export default PricePresenter
