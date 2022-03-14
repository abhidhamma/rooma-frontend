import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import RoomTypeTable from './Table'

export default function RoomTypeList() {
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)

  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={1} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2'>
          <div className='titWrap'>
            <h3>객실타입등록관리</h3>
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
              <Link
                to={'/accommodationManagement/roomType/new'}
                className={'btn btn-middle purple'}
              >
                객실타입추가
              </Link>
            </div>
          </div>
          <RoomTypeTable />
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
