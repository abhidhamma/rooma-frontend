import { amountAtom } from '@state/calculateManagement/reservationList'
import { formatMoney } from '@util/common/others'
import { useRecoilValue } from 'recoil'
import ReadReservationList from './ReadReservationList'

export default function Table({ watch }) {
  const {
    totalNight,
    totalRoomSalePrice,
    totalAddPersionPrice,
    totalAddOptionPrice,
    totalAdjRoomPrice,
    totalPayAmount,
    totalPriceSum,
    totalRemainAmount,
  } = useRecoilValue(amountAtom)
  return (
    <table className='tbl-list'>
      <caption>숙소목록</caption>
      <colgroup>
        <col width='60px' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
        <col width='' />
      </colgroup>
      <thead>
        <tr>
          <th>번호</th>
          <th>예약일</th>
          <th>예약처</th>
          <th>고객명</th>
          <th>고객연락처</th>
          <th>투숙일</th>
          <th>퇴실일</th>
          <th>투숙기간</th>
          <th>거래처명</th>
          <th>숙소명</th>
          <th>객실타입</th>
          <th>객실명</th>
          <th>객실판매요금</th>
          <th>인원추가요금</th>
          <th>옵션추가요금</th>
          <th>객실조정요금</th>
          <th>합계</th>
          <th>결제금액</th>
          <th>잔액</th>
          <th>결제방법</th>
          <th>상태</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <tr className='total'>
          <td colSpan='7'>합계</td>
          <td>{`${totalNight}N`}</td>
          <td colSpan='4'></td>
          <td>{formatMoney(totalRoomSalePrice)}</td>
          <td>{formatMoney(totalAddPersionPrice)}</td>
          <td>{formatMoney(totalAddOptionPrice)}</td>
          <td>{formatMoney(totalAdjRoomPrice)}</td>
          <td>{formatMoney(totalPayAmount)}</td>
          <td>{formatMoney(totalPriceSum)}</td>
          <td>{formatMoney(totalRemainAmount)}</td>
          <td colSpan='4'></td>
        </tr>
        <ReadReservationList watch={watch} />
        {/* <tr>
          <td>1</td>
          <td>21-11-29</td>
          <td>숙박</td>
          <td>홍길동</td>
          <td>01023232323</td>
          <td>21-11-29</td>
          <td>21-11-29</td>
          <td>2N</td>
          <td>에어비앤비</td>
          <td>롯데호텔</td>
          <td>디럭스룸</td>
          <td>101호</td>
          <td>440,000</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>440,000</td>
          <td>0</td>
          <td>440,000</td>
          <td>카드</td>
          <td>
            <span className='state s1'>예약</span>
          </td>
          <td>상세보기</td>
        </tr>
        <tr>
          <td>1</td>
          <td>21-11-29</td>
          <td>숙박</td>
          <td>홍길동</td>
          <td>01023232323</td>
          <td>21-11-29</td>
          <td>21-11-29</td>
          <td>2N</td>
          <td>에어비앤비</td>
          <td>롯데호텔</td>
          <td>디럭스룸</td>
          <td>101호</td>
          <td>440,000</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>440,000</td>
          <td>0</td>
          <td>440,000</td>
          <td>카드</td>
          <td>
            <span className='state s2'>잔금</span>
          </td>
          <td>상세보기</td>
        </tr>
        <tr>
          <td>1</td>
          <td>21-11-29</td>
          <td>숙박</td>
          <td>홍길동</td>
          <td>01023232323</td>
          <td>21-11-29</td>
          <td>21-11-29</td>
          <td>2N</td>
          <td>에어비앤비</td>
          <td>롯데호텔</td>
          <td>디럭스룸</td>
          <td>101호</td>
          <td>440,000</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>440,000</td>
          <td>0</td>
          <td>440,000</td>
          <td>카드</td>
          <td>
            <span className='state s3'>미입금</span>
          </td>
          <td>상세보기</td>
        </tr>
        <tr>
          <td>1</td>
          <td>21-11-29</td>
          <td>숙박</td>
          <td>홍길동</td>
          <td>01023232323</td>
          <td>21-11-29</td>
          <td>21-11-29</td>
          <td>2N</td>
          <td>에어비앤비</td>
          <td>롯데호텔</td>
          <td>디럭스룸</td>
          <td>101호</td>
          <td>440,000</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>440,000</td>
          <td>0</td>
          <td>440,000</td>
          <td>카드</td>
          <td>
            <span className='state s4'>예약완료</span>
          </td>
          <td>상세보기</td>
        </tr> */}
      </tbody>
    </table>
  )
}
