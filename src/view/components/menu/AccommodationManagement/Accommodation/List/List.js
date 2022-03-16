import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import SideBar from '@components/menu/AccommodationManagement/SideBar'
import AccommodationTable from '@components/menu/AccommodationManagement/Accommodation/List/Table'
import { useRef } from 'react'
import { searchKeywordAtom } from '@state/common/search'
import SearchBox from '../../common/SearchBox'

export default function AccommodationList() {
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)

  const setSearchKeyword = useSetRecoilState(searchKeywordAtom)
  const searchKeywordRef = useRef('')
  const handleSearchKeyword = () => setSearchKeyword(searchKeywordRef.current.value)
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={0} />
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
            <SearchBox
              linkTo={'/accommodationManagement/accommodation/new'}
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
