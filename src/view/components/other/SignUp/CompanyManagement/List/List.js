import { Suspense } from 'react'
import CompanyTable from './Table'

export default function CompanyList() {
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
            <span className='num'>Total 3,768건 1 페이지</span>
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
