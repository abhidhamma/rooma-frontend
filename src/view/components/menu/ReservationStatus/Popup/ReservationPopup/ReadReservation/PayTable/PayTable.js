import PayTableForm from './PayTableForm'

export default function PayTable({ register, reset, watch, getValues, payHistory }) {
  console.log('PayTable')
  console.log(payHistory)
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
            100,000원
          </td>
          <td className='th'>잔액</td>
          <td>100,000원</td>
        </tr>
      </tbody>
    </table>
  )
}
