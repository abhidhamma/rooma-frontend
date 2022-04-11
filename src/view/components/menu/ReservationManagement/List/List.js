import { dayCountAtom, standardDateAtom } from '@state/reservation'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { addDays } from 'date-fns'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import ReadReservationList from './ReadReservationList'
import ReservationSearchBox from './SearchBox'
import ReservationListTable from './Table'

export default function ReservationManagementList() {
  const standardDate = useRecoilValue(standardDateAtom)
  const dayCount = useRecoilValue(dayCountAtom)
  const defaultStartDate = formatyyyyMMddWithHyphen(standardDate)
  const defaultEndDate = formatyyyyMMddWithHyphen(addDays(standardDate, dayCount - 1))

  const user = loadItem('user')
  console.log(user?.cpNo)
  const cpNo = user?.cpNo === 1 || user?.cpNo === '1' ? '0' : user?.cpNo
  console.log(cpNo)
  const defaultValues = {
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    rmNo: 0,
    rtNo: 0,
    cpNo,
    acNo: 0,
    periodType: 'checkinDate',
    searchType: '',
    searchText: '',
    reserveStatus: '',
    payStatus: '',
  }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })
  return (
    // <!-- S:Container -->
    <div id='container'>
      {/* <!-- S:content --> */}
      <div className='content3'>
        <div className='titWrap'>
          <h3>예약관리</h3>
        </div>

        <ReservationSearchBox
          register={register}
          handleSubmit={handleSubmit}
          watch={watch}
          reset={reset}
          getValues={getValues}
        />
        <ReservationListTable watch={watch} />
      </div>
      {/* <!-- E:content --> */}
    </div>
    //<!-- E:Container -->
  )
}
