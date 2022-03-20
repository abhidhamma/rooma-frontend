import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { currentAccommodationAtom } from '@state/common/common'
import { currentPeriodPriceManagementRoomTypeAtom } from '@state/priceManagement/periodPriceManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function AccommodationSelect() {
  const setCurrentPeriodPriceManagementRoomType = useSetRecoilState(
    currentPeriodPriceManagementRoomTypeAtom
  )
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

  const handleCurrentRoomType = (event) => {
    const rtNo = event.target.value
    const findFromRtNo = _.find((roomType) => roomType.rtNo === Number(rtNo))
    const currentRoomType = findFromRtNo(list)
    setCurrentPeriodPriceManagementRoomType(currentRoomType)
  }

  return (
    <select onChange={handleCurrentRoomType}>
      <option>객실타입선택</option>
      {list.map(({ rtNo, roomTypeName }) => (
        <option key={rtNo} value={rtNo}>
          {roomTypeName}
        </option>
      ))}
    </select>
  )
}
