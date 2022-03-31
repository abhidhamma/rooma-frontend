import { RESERVE_STATUS } from '@constant/constant'
import { getKeyFromValue } from '@util/common/others'
import { useEffect, useState } from 'react'

const reservationStatusMap = {
  예약완료: RESERVE_STATUS.RESERVECOMPLETE,
  입실: RESERVE_STATUS.CHECKIN,
  퇴실: RESERVE_STATUS.CHECKOUT,
  청소중: RESERVE_STATUS.CLEANING,
  예약취소: RESERVE_STATUS.CALCEL,
}

export default function ReservationStateSelect({ reservationStatus, reset, getValues }) {
  const [isReservationButtonOpen, setIsReservationButtonOpen] = useState(false)
  const [selectedText, setSelectedText] = useState(
    getKeyFromValue(reservationStatusMap, reservationStatus)
  )

  console.log('ReservationStateSelect called...')
  console.log(getKeyFromValue(reservationStatusMap, reservationStatus))
  const changeSelect = (text) => () => {
    setSelectedText(text)
    setIsReservationButtonOpen(false)
  }
  useEffect(() => {
    reset({ ...getValues(), reserveStatus: reservationStatus })
  }, [])
  useEffect(() => {
    reset({ ...getValues(), reserveStatus: reservationStatusMap[selectedText] })
  }, [selectedText])

  return (
    <div className='reserv-state'>
      <a
        href='#'
        className={isReservationButtonOpen ? 'c1 drop down' : 'c1 drop'}
        onClick={() => setIsReservationButtonOpen(!isReservationButtonOpen)}
      >
        {selectedText}
      </a>
      <ul
        className='category-menu c1'
        style={{ display: isReservationButtonOpen ? 'block' : 'none' }}
      >
        <li>
          <a href='#' onClick={changeSelect('예약완료')}>
            예약완료
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('입실')}>
            입실
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('퇴실')}>
            퇴실
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('청소중')}>
            청소중
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('예약취소')}>
            예약취소
          </a>
        </li>
      </ul>
    </div>
  )
}
