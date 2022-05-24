import { currentAccommodationAtom, sidebarOpenAtom } from '@state/common/common'
import { dayCountAtom, standardDateAtom } from '@state/reservation'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { addDays } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import CalculateSidebar from '../common/Sidebar'
import SearchBox from './SearchBox'
import Table from './Table'

export default function ReservationList() {
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)
  const defaultStartDate = formatyyyyMMddWithHyphen(standardDate)
  const defaultEndDate = formatyyyyMMddWithHyphen(addDays(standardDate, dayCount - 1))
  const sidebarOpen = useRecoilValue(sidebarOpenAtom)
  const accommodation = useRecoilValue(currentAccommodationAtom)
  console.log(accommodation)
  const user = loadItem('user')

  const defaultValues = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    rmNo: 0,
    rtNo: 0,
    cpNo: user?.cpNo === 1 ? '0' : user?.cpNo,
    acNo: String(accommodation.acNo),
    periodType: 'checkinDate',
    searchType: '',
    searchText: '',
    reserveStatus: '',
    payStatus: '',
  }
  const { register, handleSubmit, reset, getValues, watch } = useForm({ defaultValues })
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <CalculateSidebar active={0} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2' style={{ marginLeft: sidebarOpen ? '250px' : '65px' }}>
          <div className='titWrap'>
            <h3>예약목록</h3>
          </div>
          <SearchBox
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
            getValues={getValues}
            watch={watch}
          />

          <Table watch={watch} />
          {/* <div className='paging mgt_20'>
            <a href='#' className='first'>
              <span className='hdn'>맨처음페이지</span>
            </a>
            <a href='#' className='prev'>
              <span className='hdn'>이전페이지</span>
            </a>
            <a href='#' className='on'>
              1
            </a>
            <a href='#'>2</a>
            <a href='#'>3</a>
            <a href='#'>4</a>
            <a href='#'>5</a>
            <a href='#' className='next'>
              <span className='hdn'>다음페이지</span>
            </a>
            <a href='#' className='last'>
              <span className='hdn'>맨마지막페이지</span>
            </a>
          </div> */}
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
