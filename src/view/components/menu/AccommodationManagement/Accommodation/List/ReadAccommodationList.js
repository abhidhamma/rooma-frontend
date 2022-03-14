import { readAccommodationListSelector } from '@state/accommodation/accommodation'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'

export default function ReadAccommodationList() {
  const setTotalCount = useSetRecoilState(totalCountAtom)

  const currentPage = useRecoilValue(currentPageAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const data = { cpNo: '1', name: '', startRow: `${currentIndex}`, rowCount: `${rowCount}` }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(data)))
  const resetReadAccommodationListSelector = useRecoilRefresher_UNSTABLE(
    readAccommodationListSelector(getFormDataFromJson(data))
  )
  console.log('selector called!')
  console.log(list, totalCount)
  useEffect(() => {
    setTotalCount(totalCount)
    resetReadAccommodationListSelector()
  }, [currentIndex])
  return (
    <>
      {list.map((accommodation) => (
        <tr key={accommodation.acNo}>
          <td>
            <span className='only check'>
              <input id='check2' type='checkbox' />
              <label htmlFor='check2'>
                <span className='hidden'>전체선택</span>
              </label>
            </span>
          </td>
          <td>{accommodation.acNo}</td>
          <td>
            <Link to={`/accommodationManagement/accommodation/${accommodation.acNo}`}>
              신라호텔
            </Link>
          </td>
          <td>{accommodation.name}</td>
          <td>{accommodation.address1}</td>
          <td>{accommodation.type}</td>
          <td>21.11.29</td>
          <td>21.11.29</td>
          <td>최고관리자</td>
          <td>
            <select>
              <option>미사용</option>
              <option>사용</option>
            </select>
          </td>
        </tr>
      ))}
    </>
  )
}
