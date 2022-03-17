import { makeUpdateRoomTypeUrl } from '@constant/locationURLs'
import { readAccommodationListSelector } from '@state/accommodation/accommodation'
import { readRoomTypeListSelector } from '@state/accommodation/roomType'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { searchKeywordAtom } from '@state/common/search'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'
import UseYn from '../../common/UseYn'

export default function ReadRoomTypeList() {
  const currentPage = useRecoilValue(currentPageAtom)
  const searchKeyword = useRecoilValue(searchKeywordAtom)
  const setTotalCount = useSetRecoilState(totalCountAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const data = {
    cpNo: '1',
    roomTypeName: searchKeyword,
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
  }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(readRoomTypeListSelector(getFormDataFromJson(data)))
  const resetReadRoomTypeListSelector = useRecoilRefresher_UNSTABLE(
    readRoomTypeListSelector(getFormDataFromJson(data))
  )

  //숙소명 찾기
  const parameter = { cpNo: '1', name: '', startRow: 0, rowCount: 999 }
  const {
    data: {
      data: { list: cpList },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(parameter)))
  let acNameMap = listToMap(cpList)

  useEffect(() => {
    setTotalCount(totalCount)
    resetReadRoomTypeListSelector()
  }, [currentIndex, totalCount])
  return (
    <>
      {list
        .map((roomType) => ({ ...roomType, acName: acNameMap[roomType.acNo] }))
        .map((roomType) => {
          const UPDATE_ROOMTYPE_URL = makeUpdateRoomTypeUrl(roomType.rtNo)
          const textWithLink = (text) => <Link to={UPDATE_ROOMTYPE_URL}>{text}</Link>
          return (
            <tr key={roomType.rtNo}>
              <td>
                <span className='only check'>
                  <input id='check2' type='checkbox' />
                  <label htmlFor='check2'>
                    <span className='hidden'>전체선택</span>
                  </label>
                </span>
              </td>
              <td>{textWithLink(roomType.rtNo)}</td>
              <td>{textWithLink('신라호텔')}</td>
              <td>{textWithLink(roomType.acName)}</td>
              <td>{textWithLink(roomType.roomTypeName)}</td>
              <td>{textWithLink(roomType.roomTotalNum)}</td>
              <td>{textWithLink(roomType.saleStartdate)}</td>
              <td>{textWithLink(roomType.saleEnddate)}</td>
              <td>{textWithLink(roomType.regDate.substring(0, 10))}</td>
              <td>{textWithLink(roomType.regId)}</td>
              {/* 담당자 모르겠음 */}
              <td>{textWithLink(roomType.originPrice)}</td>
              <td>
                <UseYn type={'roomType'} rowData={roomType} />
              </td>
            </tr>
          )
        })}
    </>
  )
}
const listToMap = (cpList) => {
  let tempObject = {}
  const eachList = _.each(({ acNo, name }) => {
    tempObject = { ...tempObject, [acNo]: name }
  })
  eachList(cpList)
  return tempObject
}
