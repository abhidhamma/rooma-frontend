import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { CREATE_ROOMTYPE_URL } from '@constant/locationURLs'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { useRecoilValue } from 'recoil'
import SearchBox from '../../common/SearchBox'
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
            <SearchBox
              linkTo={CREATE_ROOMTYPE_URL}
              linkText={'객실타입추가'}
              optionName={'객실타입명'}
            />
          </div>
          <RoomTypeTable />
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
