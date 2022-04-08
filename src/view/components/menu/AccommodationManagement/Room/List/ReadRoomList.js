import { makeUpdateRoomUrl } from '@constant/locationURLs'
import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { readRoomListSelector } from '@state/accommodationManagement/room'
import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { searchKeywordAtom } from '@state/common/search'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'
import UseYn from '../../common/UseYn'

export default function ReadRoomList() {
  const currentPage = useRecoilValue(currentPageAtom)
  const searchKeyword = useRecoilValue(searchKeywordAtom)
  const setTotalCount = useSetRecoilState(totalCountAtom)

  const user = loadItem('user')

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const data = {
    cpNo: user?.cpNo,
    name: searchKeyword,
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
  }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(readRoomListSelector(getFormDataFromJson(data)))
  const resetReadRoomListSelector = useRecoilRefresher_UNSTABLE(
    readRoomListSelector(getFormDataFromJson(data))
  )

  //숙소명 찾기
  const readAccommodationParameter = { cpNo: '1', name: '', startRow: 0, rowCount: 999 }
  const {
    data: {
      data: { list: acList },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(readAccommodationParameter)))
  let acNameMap = aclistToMap(acList)

  //객실타입 찾기
  const readRoomTypeParameter = {
    cpNo: '1',
    roomTypeName: '',
    startRow: 0,
    rowCount: 999,
  }
  const {
    data: {
      data: { list: rtList },
    },
  } = useRecoilValue(readRoomTypeListSelector(getFormDataFromJson(readRoomTypeParameter)))
  let rtNameMap = rtlistToMap(rtList)

  useEffect(() => {
    setTotalCount(totalCount)
    resetReadRoomListSelector()
  }, [currentIndex, totalCount])

  return (
    <>
      {list
        .map((room) => ({ ...room, rtName: rtNameMap[room.rtNo] }))
        .map((room) => ({ ...room, acName: acNameMap[room.acNo] }))
        .map((room) => {
          const UPDATE_ROOM_URL = makeUpdateRoomUrl(room.rmNo)
          const textWithLink = (text) => <Link to={UPDATE_ROOM_URL}>{text}</Link>
          return (
            <tr key={room.rmNo}>
              <td>
                <span className='only check'>
                  <input id='check2' type='checkbox' />
                  <label htmlFor='check2'>
                    <span className='hidden'>전체선택</span>
                  </label>
                </span>
              </td>
              <td>{textWithLink(room.rmNo)}</td>
              <td>{textWithLink(room.acName)}</td>
              <td>{textWithLink(room.rtName)}</td>
              <td>{textWithLink(room.name)}</td>
              <td>{textWithLink(room.saleStartdate)}</td>
              <td>{textWithLink(room.saleEnddate)}</td>
              <td>{textWithLink(room.regDate.substring(0, 10))}</td>
              <td>{textWithLink(room.regId)}</td>
              <td>
                <UseYn type={'room'} rowData={room} />
              </td>
            </tr>
          )
        })}
    </>
  )
}
const aclistToMap = (acList) => {
  let tempObject = {}
  const eachList = _.each(({ acNo, name }) => {
    tempObject = { ...tempObject, [acNo]: name }
  })
  eachList(acList)
  return tempObject
}
const rtlistToMap = (rtList) => {
  let tempObject = {}
  const eachList = _.each(({ rtNo, roomTypeName }) => {
    tempObject = { ...tempObject, [rtNo]: roomTypeName }
  })
  eachList(rtList)
  return tempObject
}
