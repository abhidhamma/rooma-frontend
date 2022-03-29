import { readRoomListSelector } from '@state/accommodationManagement/room'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RoomSelect({ roomType, room, setRoom, defaultRtNo }) {
  console.log('roomSelectCalled...')
  const { acNo } = useRecoilValue(currentAccommodationAtom)
  const { rtNo } = roomType
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
  const reset = useRecoilRefresher_UNSTABLE(readRoomList(data))
  console.log(acNo, rtNo, list)

  useEffect(() => {
    setRoom(list[0])
  }, [])

  useEffect(() => {
    reset()
  }, [])

  const handleCurrentRoom = (event) => {
    const rmNo = event.target.value
    if (rmNo === '0') {
      console.log(rmNo, 'rmNo0 reset')
      setRoom({ originPrice: '', salePrice: '', providePrice: '' })
    } else {
      const findFromRmNo = _.find((roomType) => roomType.rmNo === Number(rmNo))
      const currentRoom = findFromRmNo(list)
      setRoom(currentRoom)
    }
  }

  return (
    <select onChange={handleCurrentRoom} defaultValue={room?.rmNo}>
      {list.map(({ rmNo, name }) => (
        <option key={rmNo} value={rmNo}>
          {name}
        </option>
      ))}
    </select>
  )
}
