import { numberToArray } from '@util/common/lodash'

export default function DummayTable({ totalColumnCount }) {
  const columnCount = totalColumnCount - 2
  const columnArray = numberToArray(columnCount)
  const rowCount = 7
  const rowArray = numberToArray(rowCount)

  //동일한거 체크박스 번호 rowCount
  return (
    <>
      {rowArray.map((rowNumber) => (
        <tr key={rowNumber}>
          <td>
            <span className='only check'>
              <input id='check2' type='checkbox' />
              <label htmlFor='check2'>
                <span className='hidden'>전체선택</span>
              </label>
            </span>
          </td>
          {columnArray.map((columnNumber) => (
            <td key={columnNumber}></td>
          ))}
          <td>
            <select>
              <option value={'N'}>미사용</option>
              <option value={'Y'}>사용</option>
            </select>
          </td>
        </tr>
      ))}
    </>
  )
}
