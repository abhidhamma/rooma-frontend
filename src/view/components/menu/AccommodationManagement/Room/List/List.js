import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { CREATE_ROOM_URL } from '@constant/apiURLs'
import { CREATE_ROOM_FORM_URL } from '@constant/locationURLs'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { useRecoilValue } from 'recoil'
import SearchBox from '../../common/SearchBox'
import RoomTable from './Table'

export default function RoomList() {
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)

  return (
    // <!-- S:Container -->
    <div id='container' className='split'>
      {/* <!-- S:lnb --> */}
      <SideBar active={2} />
      {/* <!-- E:lnb --> */}
      {/* <!-- S:content --> */}
      <div className='content2'>
        <div className='titWrap'>
          <h3>객실등록관리</h3>
        </div>
        <div className='searchWrap'>
          <span className='num'>
            Total {totalCount}건 {currentPage}페이지
          </span>
          <SearchBox linkTo={CREATE_ROOM_FORM_URL} linkText={'객실추가'} optionName={'객실명'} />
        </div>
        <RoomTable />
      </div>
      {/* <!-- E:content --> */}
    </div>
    // <!-- E:Container -->
  )
}
