import { formatdd, formatMMdd } from '@util/common/dateUtil'
import { isSaturday, isSunday } from 'date-fns'

export default function Week({ register, week }) {
  return (
    <>
      <tr className='date'>
        <th>날짜</th>
        {week.map((date, index) => (
          <th key={index} className={isSunday(date) || isSaturday(date) ? 'red-txt' : ''}>
            {formatdd(date)}
          </th>
        ))}
      </tr>
      <tr>
        <td className='bg'>정상</td>
        {week.map((date, index) => (
          <td key={index}>
            <div className='n-input'>
              <input type='text' {...register(`originPrice${formatMMdd(date)}`)} />
              <span>원</span>
            </div>
          </td>
        ))}
      </tr>
      <tr>
        <td className='bg'>할인</td>
        {week.map((date, index) => (
          <td key={index}>
            <div className='n-input'>
              <input type='text' {...register(`salePrice${formatMMdd(date)}`)} />
              <span>원</span>
            </div>
          </td>
        ))}
      </tr>
      <tr>
        <td className='bg'>입금</td>
        {week.map((date, index) => (
          <td key={index}>
            <div className='n-input'>
              <input type='text' {...register(`providePrice${formatMMdd(date)}`)} />
              <span>원</span>
            </div>
          </td>
        ))}
      </tr>
    </>
  )
}
