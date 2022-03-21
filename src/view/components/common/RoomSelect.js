import { readRoomListSelector } from '@state/accommodationManagement/room'
import { currentAccommodationAtom } from '@state/common/common'
import { roomSelectAtom } from '@state/common/form'
import { currentPeriodPriceManagementRoomTypeAtom } from '@state/priceManagement/periodPriceManagement'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function RoomSelect() {
  const [room, setRoom] = useRecoilState(roomSelectAtom)
  const { acNo } = useRecoilValue(currentAccommodationAtom)
  const { rtNo } = useRecoilValue(currentPeriodPriceManagementRoomTypeAtom)
  const addParameter = (data) => {
    if (acNo !== undefined) {
      data = { ...data, acNo }
    }
    if (rtNo !== undefined) {
      data = { ...data, rtNo }
    }
    return data
  }

  const data = {
    cpNo: '1',
    name: '',
    startRow: '0',
    rowCount: '999',
  }

  const readRoomList = _.flow(addParameter, getFormDataFromJson, readRoomListSelector)
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readRoomList(data))

  const handleCurrentRoom = (event) => {
    const rmNo = event.target.value
    if (rmNo === '0') {
      console.log(rmNo, 'rtNo0 reset')
      setRoom({ originPrice: '', salePrice: '', providePrice: '' })
    } else {
      const findFromRmNo = _.find((roomType) => roomType.rmNo === Number(rmNo))
      const currentRoom = findFromRmNo(list)
      setRoom(currentRoom)
    }
  }

  return (
    <select onChange={handleCurrentRoom} value={room.rmNo}>
      {list.map(({ rmNo, name }) => (
        <option key={rmNo} value={rmNo}>
          {name}
        </option>
      ))}
    </select>
  )
}
