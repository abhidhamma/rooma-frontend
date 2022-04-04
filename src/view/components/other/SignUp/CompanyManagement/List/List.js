import { CREATE_COMPANY_URL } from '@constant/locationURLs'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import CompanyTable from './Table'

export default function CompanyList() {
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='full-content'>
          <div className='titWrap'>
            <h3>회원관리</h3>
          </div>
          <div className='searchWrap'>
            <span className='num'>
              Total {totalCount}건 {currentPage}페이지
            </span>
            <div className='searchBox'>
              <select className='mgr_5'>
                <option>업체아이디</option>
              </select>
              <input type='text' placeholder='검색어를 입력하세요' className='mgr_5' />
              <button className='btn-search mgr_5' type='button'>
                <span className='hidden'>검색</span>
              </button>
              <Link to={CREATE_COMPANY_URL} className='btn btn-middle purple'>
                업체추가
              </Link>
            </div>
          </div>
          <Suspense fallback={<div>loading...</div>}>
            <CompanyTable />
          </Suspense>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
