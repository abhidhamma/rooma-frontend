import AccommodationSelect from '@components/menu/ReservationManagement/List/AccommodationSelect'
import ReservationDateForm from '@components/menu/ReservationManagement/List/ReservationDateForm'
import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  amountAtom,
  readCalculateReservationListSelector,
} from '@state/calculateManagement/reservationList'
import { standardDateAtom } from '@state/reservation'
import { readReservationListAtom } from '@state/reservationManagement/reservationManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { Suspense } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { calculateAmount } from './ReadReservationList'

export default function SearchBox({ register, handleSubmit, reset, getValues, watch }) {
  const readReservationListCallback = useApiCallback('readReservationList')
  const setReadReservationList = useSetRecoilState(readReservationListAtom)
  const setAmount = useSetRecoilState(amountAtom)

  const standardDate = useRecoilValue(standardDateAtom)
  const today = formatyyyyMMddWithHyphen(standardDate)
  const user = loadItem('user')

  const readReservationListParameter = {
    startDate: watch('startDate'),
    endDate: watch('endDate'),
    rmNo: 0,
    rtNo: 0,
    cpNo: user?.cpNo === 1 ? '0' : user?.cpNo,
    acNo: watch('acNo'),
    periodType: watch('periodType'),
    searchType: watch('searchType'),
    searchText: watch('searchText'),
  }

  const onSubmit = (submitData) => {
    readReservationListCallback(
      readCalculateReservationListSelector(getFormDataFromJson(readReservationListParameter))
    ).then((result) => {
      const { message } = result

      if (message === '성공') {
        const {
          data: { list },
        } = result
        setReadReservationList({ list })
        setAmount(calculateAmount(list))
      }
    })
  }

  const todaySubmit = () => {
    reset({ ...getValues(), startDate: today, endDate: today })

    readReservationListCallback(
      readCalculateReservationListSelector(
        getFormDataFromJson({ ...readReservationListParameter, startDate: today, endDate: today })
      )
    ).then((result) => {
      const { message } = result

      if (message === '성공') {
        const {
          data: { list },
        } = result
        setReadReservationList({ list })
        setAmount(calculateAmount(list))
      }
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='calendarWrap mgb_40 mgt_10'>
          <div className='info'>
            <dl>
              <dt>숙소선택 :</dt>
              <dd>
                <Suspense
                  fallback={
                    <select>
                      <option>숙소선택(전체)</option>
                    </select>
                  }
                >
                  <AccommodationSelect register={register} />
                </Suspense>
              </dd>
            </dl>
          </div>
          <dl className='period mgt_10'>
            <dt>거래일자 :</dt>
            <dd>
              <select className='mgr_5' {...register('periodType')}>
                <option value={'checkinDate'}>체크인</option>
                <option value={'regDate'}>예약일</option>
              </select>
              {/* <div className='date'>
              <input type='number' placeholder='기간선택' className='left' />
            </div>
            <div className='mgl_5 mgr_5 date'>
              <input type='number' placeholder='기간선택' className='left' />
            </div> */}
              <ReservationDateForm
                register={register}
                reset={reset}
                getValues={getValues}
                watch={watch}
                top={102}
              />

              <button className='btn btn-middle purple' type='submit'>
                검색
              </button>
              <button className='btn btn-middle purple2' type='button' onClick={todaySubmit}>
                오늘보기
              </button>
            </dd>
          </dl>
        </div>
        <div className='searchWrap'>
          <span className='num'>{/* Total 3,768건 1 페이지 */}</span>
          <div className='searchBox'>
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
            <a href='#' className='btn btn-middle line1'>
              엑셀다운받기
            </a>
            <a href='#' className='btn btn-middle line1'>
              자료출력하기
            </a>
          </div>
        </div>
      </form>
    </>
  )
}
