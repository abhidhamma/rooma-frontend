import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { Suspense } from 'react'
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
              <a href='#' className='btn btn-middle purple'>
                업체추가
              </a>
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
