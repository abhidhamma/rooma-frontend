import Calendar from '@components/common/Calendar'
import { showCalendarAtom } from '@state/common/calendar'
import { formatyyyyMMddWithHyphen, stringToDate } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { useEffect, useState } from 'react'
import PayDateForm from './PayDateForm'

export default function PayTableForm({ register, reset, getValues, watch, payHistory }) {
  const [payFormCount, setPayFormCount] = useState(1)
  const today = new Date()

  const increasePayFormCount = () => {
    setPayFormCount((prev) => (prev === 4 ? prev : prev + 1))
  }
  const decreasePayFormCount = () => {
    setPayFormCount((prev) => (prev === 1 ? prev : prev - 1))
  }

  useEffect(() => {
    setPayFormCount(payHistory.length)
  }, [])

  return (
    <>
      {numberToArray(payFormCount).map((count) => {
        return (
          <tr key={count}>
            <td>
              <select {...register(`payGubun${count}`)}>
                <option value={'1차결제'}>1차결제</option>
                <option value={'2차결제'}>2차결제</option>
                <option value={'3차결제'}>3차결제</option>
                <option value={'4차결제'}>4차결제</option>
              </select>
            </td>
            <td>
              <div className='dF-s'>
                <input type='text' placeholder='요금입력' {...register(`payAmount${count}`)} />
                <span className='num'>원</span>
              </div>
            </td>
            <PayDateForm
              register={register}
              reset={reset}
              getValues={getValues}
              top={-80 + 32 * (count - 1)}
              count={Number(count)}
              defaultDate={
                watch(`payDate${count}`) === undefined
                  ? formatyyyyMMddWithHyphen(new Date())
                  : watch(`payDate${count}`)
              }
            />
            <td>
              <select {...register(`payMethod${count}`)}>
                <option value={'카드'}>카드</option>
                <option value={'이체'}>이체</option>
                <option value={'현금'}>현금</option>
              </select>
            </td>
            <td className='add-del'>
              <a href='#' onClick={increasePayFormCount}>
                추가
              </a>
              <a href='#' onClick={decreasePayFormCount}>
                삭제
              </a>
            </td>
          </tr>
        )
      })}
    </>
  )
}
