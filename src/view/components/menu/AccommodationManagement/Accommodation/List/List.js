import { useRecoilValue } from 'recoil'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import SideBar from '@components/menu/AccommodationManagement/SideBar'
import AccommodationTable from '@components/menu/AccommodationManagement/Accommodation/List/Table'
import SearchBox from '../../common/SearchBox'
import { CREATE_ACCOMMODATION_URL } from '@constant/locationURLs'
import { sidebarOpenAtom } from '@state/common/common'

export default function AccommodationList() {
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  const sidebarOpen = useRecoilValue(sidebarOpenAtom)

  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={0} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2' style={{ marginLeft: sidebarOpen ? '250px' : '65px' }}>
          <div className='titWrap'>
            <h3>숙소등록관리</h3>
          </div>
          <div className='searchWrap'>
            <span className='num'>
              Total {totalCount}건 {currentPage}페이지
            </span>
            <SearchBox
              linkTo={CREATE_ACCOMMODATION_URL}
              linkText={'숙소추가'}
              optionName={'숙소명'}
            />
          </div>
          {/* <Suspense fallback={<div>loading...</div>}> */}
          <AccommodationTable />
          {/* </Suspense> */}
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
