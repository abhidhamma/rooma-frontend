import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { currentAccommodationAtom } from '@state/common/common'
import { currentPeriodPriceManagementRoomTypeAtom } from '@state/priceManagement/periodPriceManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function RoomTypeSelect() {
  const [roomType, setRoomType] = useRecoilState(currentPeriodPriceManagementRoomTypeAtom)
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
    setRoomType(list[0])
  }, [])

  const handleCurrentRoomType = (event) => {
    const rtNo = event.target.value
    if (rtNo === '0') {
      console.log(rtNo, 'rtNo0 reset')
      setRoomType({ originPrice: '', salePrice: '', providePrice: '' })
    } else {
      const findFromRtNo = _.find((roomType) => roomType.rtNo === Number(rtNo))
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
