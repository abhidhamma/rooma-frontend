import Paging from '@components/common/Paging'
import { totalCountAtom } from '@state/common/paging'
import { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import ReadReservationList from './ReadReservationList'

export default function ReservationListTable({ watch }) {
  const totalCount = useRecoilValue(totalCountAtom)
  return (
    <>
      <table className='tbl-list v1'>
        <caption>예약목록</caption>
        <colgroup>
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
        <tbody>
          <tr>
            <th>예약번호</th>
            <th>예약상태</th>
            <th>결제상태</th>
            <th>숙소명</th>
            <th>객실타입</th>
            <th>객실명</th>
            <th>거래처</th>
            <th>고객명</th>
            <th>고객전화번호</th>
            <th>체크인</th>
            <th>체크아웃</th>
            <th>결제금액</th>
            <th>예약일</th>
            <th>상세보기</th>
          </tr>
          <Suspense fallback={<tr></tr>}>
            <ReadReservationList watch={watch} />
          </Suspense>
        </tbody>
      </table>
      <Paging />
    </>
  )
}
