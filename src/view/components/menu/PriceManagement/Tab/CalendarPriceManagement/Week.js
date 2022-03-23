import { calendarPriceManagementCurrentMonthAtom } from '@state/priceManagement/calendarPriceManagement'
import { formatdd, formatMdWithDot, formatMMdd } from '@util/common/dateUtil'
import { getMonth, isSaturday, isSunday } from 'date-fns'
import { useRecoilValue } from 'recoil'

export default function Week({ register, week }) {
  const selectedMonth = useRecoilValue(calendarPriceManagementCurrentMonthAtom)

  return (
    <>
      <tr className='date'>
        <th>날짜</th>
        {week.map((date, index) => {
          const isSameMonth = getMonth(selectedMonth) === getMonth(date)
          const isHoliDay = isSunday(date) || isSaturday(date)
          return (
            <th
              key={index}
              style={{ color: isSameMonth ? (isHoliDay ? '#e62727' : 'black') : 'lightslategray' }}
            >
              {isSameMonth ? formatdd(date) : formatMdWithDot(date)}
            </th>
          )
        })}
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
