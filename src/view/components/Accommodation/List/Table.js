import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getFormDataFromJson } from '../../../../other/util/common/axiosUtil'
import useReadAccommodationListCallback from '../../../../service/hook/useReadAccommodationListCallback'
import { accommodationListAtom, readAccommodationListSelector } from '../../../../service/state/accommodation'
import { currentPageAtom } from '../../../../service/state/common/paging'
import ButtonGroup from './ButtonGroup'
import Paging from './Paging'

export default function AccommodationTable() {
  console.log('AccommodationTable called...')

  const readAccommodationListCallback = useReadAccommodationListCallback('accommodationList')
  const accommodationList = useRecoilValue(accommodationListAtom)
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  console.log(accommodationList)

  const data = { cpNo: '1', name: '', startRow: `${currentIndex}`, rowCount: `${rowCount}` }
  useEffect(() => {
    readAccommodationListCallback(readAccommodationListSelector(getFormDataFromJson(data)))
  }, [currentIndex])
  return (
    <>
      <table className='tbl-list'>
        <caption>숙소목록</caption>
        <colgroup>
          <col width='80px' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='' />
          <col width='130px' />
        </colgroup>
        <thead>
          <tr>
            <th>
              <span className='only check'>
                <input id='check1' type='checkbox' />
                <label htmlFor='check1'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </th>
            <th>번호</th>
            <th>업체명</th>
            <th>숙소명</th>
            <th>지역</th>
            <th>등급</th>
            <th>판매시작일</th>
            <th>판매종료일</th>
            <th>담당자</th>
            <th>사용</th>
          </tr>
        </thead>
        <tbody>
          {accommodationList.map((accommodation) => (
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
                <Link to={`/accommodation/${accommodation.acNo}`}>{accommodation.name}</Link>
              </td>
              <td>{accommodation.nickname}</td>
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
        </tbody>
      </table>
      <ButtonGroup />
      <Paging />
    </>
  )
}
