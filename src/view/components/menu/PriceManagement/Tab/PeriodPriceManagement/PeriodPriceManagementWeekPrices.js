import { updateRoomPricePeriod } from '@api/priceManagement/periodPriceManagement'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { selectedDateAtom } from '@state/common/calendar'
import {
  currentPeriodPriceManagementRoomTypeAtom,
  currentPeriodPriceManagementWeekPricesAtom,
  updatePeriodRoomPriceSelector,
} from '@state/priceManagement/periodPriceManagement'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { validateSavePeriodRoomPrice } from '@util/validation/validateSavePeriodRoomPrice'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

export default function PeriodPriceManagementWeekPrices() {
  const savePeriodRoomPriceCallback = useApiCallback('savePeriodRoomPrice')
  console.log('PeriodPriceManagementWeekPrices')
  const selectedDate = useRecoilValue(selectedDateAtom)
  const weekPrices = useRecoilValue(currentPeriodPriceManagementWeekPricesAtom)

  const { register, reset, handleSubmit } = useForm()

  useEffect(() => {
    reset({ ...weekPrices })
  }, [weekPrices])

  const roomType = useRecoilValue(currentPeriodPriceManagementRoomTypeAtom)

  useEffect(() => {
    reset({
      originPrice1: '',
      originPrice2: '',
      originPrice3: '',
      originPrice4: '',
      originPrice5: '',
      originPrice6: '',
      originPrice7: '',
      salePrice1: '',
      salePrice2: '',
      salePrice3: '',
      salePrice4: '',
      salePrice5: '',
      salePrice6: '',
      salePrice7: '',
      providePrice1: '',
      providePrice2: '',
      providePrice3: '',
      providePrice4: '',
      providePrice5: '',
      providePrice6: '',
      providePrice7: '',
    })
  }, [roomType])

  const onSubmit = _.flow(
    validateSavePeriodRoomPrice(roomType, selectedDate),
    preprocessSubmitData(roomType, selectedDate),
    savePeriodRoomPrice(savePeriodRoomPriceCallback)
  )

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>요일별 객실 요금</h4>
        <table>
          <caption>요일별 요금</caption>
          <colgroup>
            <col width='*' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
            <col width='13%' />
          </colgroup>
          <tbody>
            <tr>
              <th>구분</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th className='red-txt'>토</th>
              <th className='red-txt'>일</th>
            </tr>
            <tr>
              <td className='bg'>정상</td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice1')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice2')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice3')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice4')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice5')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice6')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('originPrice7')} />
                  <span>원</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='bg'>할인</td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice1')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice2')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice3')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice4')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice5')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice6')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('salePrice7')} />
                  <span>원</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='bg'>입금</td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice1')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice2')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice3')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice4')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice5')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice6')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='text' {...register('providePrice7')} />
                  <span>원</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='right mgt_20'>
          <button type='submit' className='btn purple btn-middle'>
            기간내 객실요금 변경
          </button>
        </div>
      </form>
    </section>
  )
}
const preprocessSubmitData = (roomType, selectedDate) => (submitDate) => {
  if (submitDate === false) {
    return false
  }
  const acNo = '1'
  const rtNo = roomType.rtNo
  const startDate = formatyyyyMMddWithHyphen(selectedDate.startDate)
  const endDate = formatyyyyMMddWithHyphen(selectedDate.endDate)
  const originPrice = makePrice('originPrice', submitDate)
  const salePrice = makePrice('salePrice', submitDate)
  const providePrice = makePrice('providePrice', submitDate)
  return { acNo, rtNo, startDate, endDate, originPrice, salePrice, providePrice }
}
const makePrice = (name, submitData) => {
  const tempArray = []
  const orderArray = [7, 1, 2, 3, 4, 5, 6]
  const eachPrice = _.each((number) => {
    tempArray.push(submitData[`${name}${number}`])
  })
  eachPrice(orderArray)
  return tempArray
}
const savePeriodRoomPrice = (savePeriodRoomPriceCallback) => (jsonData) => {
  if (jsonData === false) {
    return
  }
  savePeriodRoomPriceCallback(updatePeriodRoomPriceSelector(jsonData)).then((result) => {
    const { message } = result
    if (message === '업데이트 성공') {
      alert('객실요금이 변경되었습니다.')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
