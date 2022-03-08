import { useRecoilValue } from 'recoil'
import { displayAtom } from '@state/reservation'

export default function ReservationInfo() {
  const display = useRecoilValue(displayAtom)
  return (
    <div className='summary-info' style={{ position: 'absolute', top: '87px', left: '618px', display: display.display }}>
      <div className='top-info'>
        <span>{display.name}</span>
        <span>예약완료</span>
      </div>
      <div className='btm-info'>
        <div className='term-box'>
          <dl>
            <dt>체크인</dt>
            <dd>{display?.dateInfo?.checkIn.toString()}</dd>
          </dl>
          <span>{`${display?.dateInfo?.night.toString()}박`}</span>
          <dl>
            <dt>체크아웃</dt>
            <dd>{display?.dateInfo?.checkOut.toString()}</dd>
          </dl>
        </div>
        <div className='info-box'>
          <dl>
            <dt>객실/호수</dt>
            <dd>디럭스/101/침대1</dd>
          </dl>
          <dl>
            <dt>인원</dt>
            <dd>
              성인 <span>0명</span> / 유아 <span>0명</span> / 소아 <span>0명</span>
            </dd>
          </dl>
          <dl>
            <dt>전화번호</dt>
            <dd>000-000-0000</dd>
          </dl>
          <div className='txtbox'>
            <p>고객요청</p>
            <div>얼리체크인 부탁드립니다</div>
          </div>
        </div>
        <div className='price-box'>
          <dl>
            <dt>총 금액</dt>
            <dd>0원</dd>
          </dl>
          <dl>
            <dt>초과결제</dt>
            <dd>25,000원</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}
