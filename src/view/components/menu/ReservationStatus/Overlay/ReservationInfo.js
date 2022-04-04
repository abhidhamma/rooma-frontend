import { useRecoilValue } from 'recoil'
import { displayAtom } from '@state/reservation'
import { readReservationSelector } from '@state/reservationStatus/createReservation'
import { betweenyyyyMMdd, formatMMddE, stringToDate } from '@util/common/dateUtil'
import { formatMoney, getKeyFromValue } from '@util/common/others'
import _ from 'lodash/fp'
import { reservationStatusMap } from '@constant/constantVariable'

export default function ReservationInfo() {
  console.log('ReservationInfo called...')
  const display = useRecoilValue(displayAtom)
  const roomNumber = display?.roomNumber
  const rrNo = display?.data?.rrNo
  const isDisplay = display.display === 'block'

  const parameter = {
    rrNo,
  }
  const result = useRecoilValue(readReservationSelector(parameter))
  const reservation = result?.data?.data
  const checkIn = display?.data?.checkIn
  const checkOut = display?.data?.checkOut

  const roomReserve = reservation?.roomReserves?.find((reservation) => reservation.rrNo === rrNo)
  const addPersonCon = roomReserve?.addPersionCon
  const getAddPersonNum = (addPersonCon) => {
    const splitComma = _.split(',')
    const splitColon = _.split(':')
    const commaArray = splitComma(addPersonCon)
    return commaArray.map((element) => Number(splitColon(element)[1]))
  }
  const [adult, child, infant] = getAddPersonNum(addPersonCon)
  const stayNum = Number(roomReserve?.stayNum)
  const payAmount = roomReserve?.payAmount
  const rtName = roomReserve?.rtName
  console.log(display.data)
  console.log(reservation)
  console.log(checkIn, checkOut)
  console.log(roomReserve)

  return (
    <>
      {isDisplay && (
        <div
          className='summary-info'
          style={{ position: 'absolute', top: '87px', left: '618px', display: display.display }}
        >
          <div className='top-info'>
            <span>{display?.data?.userName}</span>
            <span>{getKeyFromValue(reservationStatusMap, reservation?.reserveStatus)}</span>
          </div>
          <div className='btm-info'>
            <div className='term-box'>
              <dl>
                <dt>체크인</dt>
                <dd>{checkIn !== undefined ? formatMMddE(stringToDate(checkIn)) : ''}</dd>
              </dl>
              <span>{`${betweenyyyyMMdd(checkIn, checkOut)}박`}</span>
              <dl>
                <dt>체크아웃</dt>
                <dd>{checkOut !== undefined ? formatMMddE(stringToDate(checkOut)) : ''}</dd>
              </dl>
            </div>
            <div className='info-box'>
              <dl>
                <dt>객실/호수</dt>
                <dd>
                  {rtName}/{roomNumber}
                </dd>
              </dl>
              <dl>
                <dt>인원</dt>
                <dd>
                  성인 <span>{stayNum + adult}명</span> / 소아 <span>{child}명</span> / 유아
                  <span>{infant}명</span>
                </dd>
              </dl>
              <dl>
                <dt>전화번호</dt>
                <dd>{display?.data?.userPhone}</dd>
              </dl>
              <div className='txtbox'>
                <p>고객요청</p>
                <div>{reservation?.memo !== '' ? reservation?.memo : '메모가 없습니다.'}</div>
              </div>
            </div>
            <div className='price-box'>
              <dl>
                <dt>총 금액</dt>
                <dd>{`${formatMoney(payAmount)}원`}</dd>
              </dl>
              {/* <dl>
            <dt>초과결제</dt>
            <dd>25,000원</dd>
          </dl> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
