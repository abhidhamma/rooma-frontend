import { PAY_STATUS, RESERVE_STATUS } from '@constant/constantVariable'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import {
  readReservationListAtom,
  readReservationListSelector,
} from '@state/reservationManagement/reservationManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import { Suspense } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import AccommodationSelect from './AccommodationSelect'
import ReservationDateForm from './ReservationDateForm'

export default function ReservationSearchBox({ register, handleSubmit, reset, getValues, watch }) {
  const readReservationListCallback = useApiCallback('readReservationList')
  const setReadReservationList = useSetRecoilState(readReservationListAtom)
  const totalCount = useRecoilValue(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const user = loadItem('user')
  const cpNo = user?.cpNo === 1 || user?.cpNo === '1' ? '0' : user?.cpNo

  const readReservationListParameter = {
    startDate: watch('startDate'),
    endDate: watch('endDate'),
    rmNo: 0,
    rtNo: 0,
    cpNo,
    acNo: watch('acNo'),
    periodType: watch('periodType'),
    searchType: watch('searchType'),
    searchText: watch('searchText'),
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
    reserveStatus: watch('reserveStatus'),
    payStatus: watch('payStatus'),
  }

  const onSubmit = (submitData) => {
    readReservationListCallback(
      readReservationListSelector(getFormDataFromJson(readReservationListParameter))
    ).then((result) => {
      const { message } = result

      if (message === '성공') {
        const {
          data: { list, totalCount },
        } = result
        setReadReservationList({ list, totalCount })
      }
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='calendarWrap mgb_40 mgt_10'>
          <dl className='period mgt_10'>
            <dt>검색기간 :</dt>
            <dd>
              <select className='mgr_5' {...register('periodType')}>
                <option value={'checkinDate'}>체크인</option>
                <option value={'regDate'}>예약일</option>
              </select>
              <ReservationDateForm
                register={register}
                reset={reset}
                getValues={getValues}
                watch={watch}
                top={65}
              />
              <button className='btn btn-middle purple' type='submit'>
                검색
              </button>
            </dd>
          </dl>
        </div>

        <div className='searchWrap'>
          <span className='num'>
            Total {totalCount}건 {currentPage}페이지
          </span>
          <div className='searchBox'>
            <select className='mgr_5' {...register('reserveStatus')}>
              <option value={''}>예약상태(전체)</option>
              <option value={RESERVE_STATUS.RESERVECOMPLETE}>예약완료</option>
              <option value={RESERVE_STATUS.CHECKIN}>입실</option>
              <option value={RESERVE_STATUS.CHECKOUT}>퇴실</option>
              <option value={RESERVE_STATUS.CALCEL}>취소</option>
            </select>
            <select className='mgr_5' {...register('payStatus')}>
              <option value={''}>결제상태(전체)</option>
              <option value={PAY_STATUS.NOTPAY}>미결제</option>
              <option value={PAY_STATUS.PARTIALPAY}>부분결제</option>
              <option value={PAY_STATUS.PAYCOMPLETE}>결제완료</option>
              <option value={PAY_STATUS.REFUNDREQUEST}>환불요청</option>
              <option value={PAY_STATUS.REFUNDCOMPLETE}>환불완료</option>
              <option value={PAY_STATUS.CANCEL}>결제취소</option>
            </select>
            <Suspense
              fallback={
                <select>
                  <option>숙소선택(전체)</option>
                </select>
              }
            >
              <AccommodationSelect register={register} />
            </Suspense>
            <select className='mgr_5' {...register('searchType')}>
              <option value={''}>전체</option>
              <option value={'reservenum'}>예약번호</option>
              <option value={'name'}>이름</option>
              <option value={'phone'}>전화번호</option>
            </select>
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              className='mgr_5'
              {...register('searchText')}
            />
            <button className='btn-search mgr_5' type='submit'>
              <span className='hidden'>검색</span>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
