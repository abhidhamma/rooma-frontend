import Paging from '@components/common/Paging'
import { Suspense } from 'react'
import ButtonGroup from '../../common/ButtonGroup'
import ReadRoomTypeList from './ReadRoomTypeList'

export default function RoomTypeTable() {
  console.log('RoomTypeTable called...')
  return (
    <>
      <table className='tbl-list'>
        <caption>숙소목록</caption>
        <colgroup>
          <col width='80px' />
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
          <col width='130px' />
        </colgroup>
        <tbody>
          <tr key={0}>
            <th>
              <span className='only check'>
                <input id='check1' type='checkbox' />
                <label htmlFor='check1'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </th>
            <th>번호</th>
            <th>업체명</th>
            <th>숙소명</th>
            <th>객실타입명</th>
            <th>객실수</th>
            <th>판매시작일</th>
            <th>판매종료일</th>
            <th>등록일</th>
            <th>담당자</th>
            <th>요금</th>
            <th>사용</th>
          </tr>
          <Suspense
            fallback={
              <tr>
                <td>loading...</td>
              </tr>
            }
          >
            <ReadRoomTypeList />
          </Suspense>
        </tbody>
      </table>
      <ButtonGroup addText={'객실타입추가'} addHref={'/accommodationManagement/roomType/new'} />
      <Paging />
    </>
  )
}
