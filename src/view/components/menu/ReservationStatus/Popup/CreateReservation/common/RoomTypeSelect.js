import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

export default function AddRoomTypeSelect({ roomType, setRoomType }) {
  console.log('AddRoomTypeSelect')
  console.log(roomType.rtNo)
  const { acNo } = useRecoilValue(currentAccommodationAtom)
  const addAcNo = (data) => (acNo !== undefined ? { ...data, acNo } : data)

  const data = {
    cpNo: '1',
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
      console.log('useEffect!!')
      console.log(currentRoomType)
    }
  }, [])

  const handleCurrentRoomType = (event) => {
    const rtNo = event.target.value
    if (rtNo === '0') {
      console.log(rtNo, 'rtNo0 reset')
      setRoomType({ originPrice: '', salePrice: '', providePrice: '' })
    } else {
      const findFromRtNo = _.find((iterRoomType) => Number(iterRoomType.rtNo) === Number(rtNo))
      const currentRoomType = findFromRtNo(list)
      setRoomType(currentRoomType)
    }
  }

  return (
    <select onChange={handleCurrentRoomType} defaultValue={roomType.rtNo}>
      {list.map(({ rtNo, roomTypeName }) => (
        <option key={rtNo} value={rtNo}>
          {roomTypeName}
        </option>
      ))}
    </select>
  )
}
