import { numberToArray } from '@util/common/lodash'
import { formatMoney } from '@util/common/others'
import { useEffect, useState } from 'react'
import PayTableForm from './PayTableForm'

export default function PayTable({ register, reset, watch, getValues, payHistory, payAmount }) {
  const calculatePayPrices = (payHistory) => {
    const payHistoryList = payHistory
    const length = payHistoryList.length
    let sum = 0
    for (let i = 0; i < length; i++) {
      sum += Number(payHistoryList[i].payAmount)
    }
    return sum
  }

  const totalPayPrices = calculatePayPrices(payHistory)
  const balance = Number(payAmount) - totalPayPrices

  const payDefaultValues = () => {
    const payHistoryList = payHistory
    const length = payHistoryList.length
    let tempMap = {}

    //초기화
    numberToArray(4).forEach((number) => {
      tempMap = {
        ...tempMap,
        [`payGubun${number}`]: undefined,
        [`payAmount${number}`]: undefined,
        [`payDate${number}`]: undefined,
        [`payMethod${number}`]: undefined,
      }
    })

    //값 넣기
    numberToArray(length).forEach((number) => {
      const payHistory = payHistoryList[number - 1]
      tempMap = {
        ...tempMap,
        [`payGubun${number}`]: payHistory.payGubun,
        [`payAmount${number}`]: payHistory.payAmount,
        [`payDate${number}`]: payHistory.payDate,
        [`payMethod${number}`]: payHistory.payMethod,
      }
    })

    return tempMap
  }

  useEffect(() => {
    reset({ ...getValues(), ...payDefaultValues() })
  }, [payHistory.length])

  return (
    <table className='tbl-pop mgt_20'>
      <caption>결제정보</caption>
      <colgroup>
        <col width='20%' />
        <col width='20%' />
        <col width='20%' />
        <col width='20%' />
        <col width='*' />
      </colgroup>
      <thead>
        <tr>
          <th>결제구분</th>
          <th>결제금액</th>
          <th>결제일</th>
          <th>결제방법</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <PayTableForm
          register={register}
          reset={reset}
          getValues={getValues}
          watch={watch}
          payHistory={payHistory}
        />
        <tr className='total'>
          <td className='th'>결제합계</td>
          <td colSpan='2' className='p-total'>
            {`${formatMoney(totalPayPrices)}원`}
          </td>
          <td className='th'>잔액</td>
          {/* <td>{balance < 0 ? '0원' : `${formatMoney(balance)}원`}</td> */}
          <td>{`${formatMoney(balance)}원`}</td>
        </tr>
      </tbody>
    </table>
  )
}
