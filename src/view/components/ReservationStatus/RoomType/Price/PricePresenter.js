import ReservationOverlay from '../../Overlay/ReservationOverlay'
import SourceOverlay from '../../Overlay/SourceOverlay'
import TargetOverlay from '../../Overlay/TargetOverlay'

export default function PricePresenter({ drop, reservation, currentDate, price, reservationDateArray, isDragging, isOver, handleCreateReservation, dayCount, drag, lockedRoom }) {
  return (
    <>
      <div ref={drop}>
        {lockedRoom?.targetDate === currentDate ? (
          <div className='lock'>
            <span className='hdn'>잠김</span>
          </div>
        ) : (
          <div style={{ display: 'grid', position: 'relative', width: '100%', height: '100%' }}>
            <a href='/#' className={reservation?.checkIn === currentDate ? '' : 'none'} style={{ display: 'block', placeSelf: 'center' }} onClick={handleCreateReservation}>
              {`${price}만`}
            </a>
          </div>
        )}

        {/* reservation */}
        {reservationDateArray?.indexOf(currentDate) > -1 && !isDragging && <ReservationOverlay data={reservation} drag={drag} dayCount={dayCount} currentDate={currentDate} />}
        {/* hover overlay */}
        {isOver && <TargetOverlay />}
        {/* source overlay */}
        {isDragging && <SourceOverlay />}
      </div>
    </>
  )
}
