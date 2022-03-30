import Paging from '@components/common/Paging'
import ButtonGroup from '@components/menu/AccommodationManagement/common/ButtonGroup'
import ReadCompanyList from './ReadCompanyList'

export default function CompanyTable() {
  return (
    <>
      <table className='tbl-list'>
        <caption>회원목록</caption>
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
            <th>업체아이디</th>
            <th>업체명</th>
            <th>대표명</th>
            <th>휴대폰</th>
            <th>전화번호</th>
            <th>팩스번호</th>
            <th>최종접속</th>
            <th>가입일</th>
            <th>관리자</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <ReadCompanyList />
        </tbody>
      </table>
      <ButtonGroup addText={'업체추가'} addHref={'/companyManagement/new'} />
      <Paging />
    </>
  )
}
