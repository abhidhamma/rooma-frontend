import {
  currentPeriodPriceManagementRoomTypeAtom,
  currentPeriodPriceManagementWeekPricesAtom,
} from '@state/priceManagement/periodPriceManagement'
import { numberToArray } from '@util/common/lodash'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function RoomBasicPrice() {
  console.log('RoomBasicPrice')
  const { originPrice, salePrice, providePrice } = useRecoilValue(
    currentPeriodPriceManagementRoomTypeAtom
  )
  // const { rtNo: rpNo } = useRecoilValue(currentPeriodPriceManagementRoomTypeAtom)
  // console.log(rpNo)
  // const {
  //   data: {
  //     data: { originPrice, salePrice, providePrice },
  //   },
  // } = useRecoilValue(readRoomPriceSelector({ rpNo }))

  // console.log(originPrice, salePrice, providePrice)
  const setCurrentPeriodPriceManagementWeekPrices = useSetRecoilState(
    currentPeriodPriceManagementWeekPricesAtom
  )

  const defaultValues = {
    originPrice,
    salePrice,
    providePrice,
  }

  const { register, reset, handleSubmit } = useForm()

  useEffect(() => {
    reset({ ...defaultValues })
  }, [originPrice, salePrice, providePrice])

  const onSubmit = (submitData) => {
    const weekPrices = makeWeekPrices(submitData)
    setCurrentPeriodPriceManagementWeekPrices(weekPrices)
  }
  const makeWeekPrices = (submitData) => {
    let tempWeekPrices = {}
    const { originPrice, salePrice, providePrice } = submitData
    const weekCount = () => 7
    const eachWeek = _.each((number) => {
      tempWeekPrices = {
        ...tempWeekPrices,
        [`originPrice${number}`]: originPrice,
        [`salePrice${number}`]: salePrice,
        [`providePrice${number}`]: providePrice,
      }
    })
    _.flow(weekCount, numberToArray, eachWeek)(submitData)
    return tempWeekPrices
  }
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>객실기본요금</h4>
        <table>
          <caption>요일별 요금</caption>
          <colgroup>
            <col width='33.3%' />
            <col width='33.3%' />
            <col width='33.4%' />
          </colgroup>
          <tbody>
            <tr>
              <th>정상가</th>
              <th>할인가</th>
              <th>입금가</th>
            </tr>
            <tr>
              <td>
                <div className='n-input'>
                  <input type='number' {...register('originPrice')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' {...register('salePrice')} />
                  <span>원</span>
                </div>
              </td>
              <td>
                <div className='n-input'>
                  <input type='number' {...register('providePrice')} />
                  <span>원</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='right mgt_20'>
          <button type='submit' className='btn purple btn-middle'>
            요일별 요금설정
          </button>
        </div>
      </form>
    </section>
  )
}
