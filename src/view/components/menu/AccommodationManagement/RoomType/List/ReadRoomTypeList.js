import { readRoomTypeListSelector } from '@state/accommodation/roomType'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'

export default function ReadRoomTypeList() {
  const currentPage = useRecoilValue(currentPageAtom)
  const setTotalCount = useSetRecoilState(totalCountAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const data = { cpNo: '1', name: '', startRow: `${currentIndex}`, rowCount: `${rowCount}` }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(readRoomTypeListSelector(getFormDataFromJson(data)))
  const resetReadRoomTypeListSelector = useRecoilRefresher_UNSTABLE(
    readRoomTypeListSelector(getFormDataFromJson(data))
  )

  useEffect(() => {
    setTotalCount(totalCount)
    resetReadRoomTypeListSelector()
  }, [])
  console.log('selector called!')
  console.log(list, totalCount)
  return (
    <>
      {list.map((roomType) => (
        <tr key={roomType.rtNo}>
          <td>
            <span className='only check'>
              <input id='check2' type='checkbox' />
              <label htmlFor='check2'>
                <span className='hidden'>전체선택</span>
              </label>
            </span>
          </td>
          <td>{roomType.rtNo}</td>
          <td>신라호텔</td>
          <td>{roomType.acNo}</td>
          {/* 숙소명 모든라인 다 요청해야하나? */}
          <td>
            <Link to={`/accommodationManagement/roomType/${roomType.rtNo}`}>
              {roomType.roomTypeName}
            </Link>
          </td>
          <td>{roomType.roomTotalNum}</td>
          <td>{roomType.saleStartdate}</td>
          <td>{roomType.saleEnddate}</td>
          <td>{roomType.regDate.substring(0, 10)}</td>
          <td>{roomType.regId}</td>
          {/* 담당자 모르겠음 */}
          <td>{roomType.originPrice}</td>
          <td>
            <select defaultValue={roomType.useYn}>
              <option value={'N'}>미사용</option>
              <option value={'Y'}>사용</option>
            </select>
          </td>
        </tr>
      ))}
    </>
  )
}
