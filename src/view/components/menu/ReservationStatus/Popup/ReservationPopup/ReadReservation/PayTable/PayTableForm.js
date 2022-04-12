import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  deletePayRecordSelector,
  payFormCountAtom,
  readReservationSelector,
} from '@state/reservationStatus/createReservation'
import { readReservationParameterAtom } from '@state/reservationStatus/reservationStatus'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { useEffect } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'
import PayDateForm from './PayDateForm'

export default function PayTableForm({ register, reset, getValues, watch, payHistory }) {
  const deletePayRecordCallback = useApiCallback('deletePayRecord')
  const [payFormCount, setPayFormCount] = useRecoilState(payFormCountAtom)

  const readReservationParameter = useRecoilValue(readReservationParameterAtom)
  const parameter = {
    rrNo: readReservationParameter.rrNo,
  }
  const resetReadReservation = useRecoilRefresher_UNSTABLE(readReservationSelector(parameter))

  const increasePayFormCount = () => {
    setPayFormCount((prev) => (prev === 4 ? prev : prev + 1))
  }
  const decreasePayFormCount = (count) => {
    const confirm = window.confirm('삭제하시겠습니까?')

    if (confirm) {
      deletePayRecordCallback(
        deletePayRecordSelector(
          getFormDataFromJson({
            rpNo: payHistory[count - 1].rpNo,
            reserveNum: Number(payHistory[count - 1].reserveNum),
          })
        )
      ).then((result) => {
        const { message } = result
        if (message === '저장되었습니다.') {
          alert('삭제되었습니다.')
          resetReadReservation()
        }
      })
    }
  }

  useEffect(() => {
    if (payHistory.length === 0) {
      setPayFormCount(1)
    } else {
      setPayFormCount(payHistory.length)
    }
  }, [payHistory.length])

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
              <a href='#' onClick={() => decreasePayFormCount(count)}>
                삭제
              </a>
            </td>
          </tr>
        )
      })}
    </>
  )
}
