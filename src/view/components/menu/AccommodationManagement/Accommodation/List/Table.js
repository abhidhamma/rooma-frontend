import ButtonGroup from '../../common/ButtonGroup'
import Paging from '@components/common/Paging'
import ReadAccommodationList from './ReadAccommodationList'
import { totalCountAtom } from '@state/common/paging'
import { useRecoilValue } from 'recoil'
import { CREATE_ACCOMMODATION_URL } from '@constant/locationURLs'

export default function AccommodationTable() {
  const totalCount = useRecoilValue(totalCountAtom)
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
          <col width='130px' />
        </colgroup>
        <thead>
          <tr>
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
            <th>지역</th>
            <th>등급</th>
            <th>판매시작일</th>
            <th>판매종료일</th>
            <th>담당자</th>
            <th>사용</th>
          </tr>
        </thead>
        <tbody>
          <ReadAccommodationList />
        </tbody>
      </table>
      {totalCount === 0 && (
        <div
          style={{
            height: '50px',
            display: 'grid',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          결과가 없습니다. 숙소명의 전체이름을 검색해주세요.
        </div>
      )}
      <ButtonGroup addText={'숙소추가'} addHref={CREATE_ACCOMMODATION_URL} />
      <Paging />
    </>
  )
}
