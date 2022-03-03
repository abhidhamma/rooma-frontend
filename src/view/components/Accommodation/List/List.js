import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentPageAtom, totalCountAtom } from '../../../../service/state/common/paging'
import SideBar from '../SideBar'
import AccommodationTable from './Table'

export default function AccommodationList() {
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2'>
          <div className='titWrap'>
            <h3>숙소등록관리</h3>
          </div>
          <div className='searchWrap'>
            <span className='num'>
              Total {totalCount}건 {currentPage}페이지
            </span>
            <div className='searchBox'>
              <select className='mgr_5'>
                <option>숙소명</option>
              </select>
              <input type='text' placeholder='검색어를 입력하세요' className='mgr_5' />
              <button className='btn-search mgr_5' type='button'>
                <span className='hidden'>검색</span>
              </button>
              <Link to={'/accommodation/new'} className={'btn btn-middle purple'}>
                숙소추가
              </Link>
            </div>
          </div>
          <AccommodationTable />
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
