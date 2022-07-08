import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

export default function AddRoomTypeSelect({ roomType, setRoomType, setRoom, acNo }) {
  const addAcNo = (data) => (acNo !== undefined ? { ...data, acNo } : data)

  const user = loadItem('user')
  const data = {
    cpNo: user.cpNo === 1 ? '0' : user.cpNo,
    roomTypeName: '',
    startRow: '0',
    rowCount: '999',
  }

  const readRoomTypeList = _.flow(addAcNo, getFormDataFromJson, readRoomTypeListSelector)
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readRoomTypeList(data))

  useEffect(() => {
    if (roomType?.rtNo === undefined) {
      setRoomType(list[0])
    } else {
      const findFromRtNo = _.find(
        (iterRoomType) => Number(iterRoomType.rtNo) === Number(roomType.rtNo)
      )
      const currentRoomType = findFromRtNo(list)
      setRoomType(currentRoomType)
    }
  }, [])

  const handleCurrentRoomType = (event) => {
    const rtNo = event.target.value
    if (rtNo === '0') {
      setRoomType({ originPrice: '', salePrice: '', providePrice: '' })
      setRoom({ rmNo: 0 })
    } else {
      const findFromRtNo = _.find((iterRoomType) => Number(iterRoomType.rtNo) === Number(rtNo))
      const currentRoomType = findFromRtNo(list)
      setRoomType(currentRoomType)
      setRoom({ rmNo: 0 })
    }
  }

  return (
    <select
      // {...register(`roomType${count}`)}
      onChange={handleCurrentRoomType}
      defaultValue={roomType.rtNo}
    >
      <option value={0}>객실타입선택</option>
      {list.map(({ rtNo, roomTypeName }) => (
        <option key={rtNo} value={rtNo}>
          {roomTypeName}
        </option>
      ))}
    </select>
  )
}
