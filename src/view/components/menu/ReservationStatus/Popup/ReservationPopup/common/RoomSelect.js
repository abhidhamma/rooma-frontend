import { readRoomListSelector } from '@state/accommodationManagement/room'
import { selectedDateAtom } from '@state/common/calendar'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RoomSelect({ roomType, room, setRoom, count, watch }) {
  const selectedDate = useRecoilValue(selectedDateAtom)
  // const { cpNo } = loadItem('user')
  const { acNo } = useRecoilValue(currentAccommodationAtom)

  const { rtNo } = roomType
  const addParameter = (data) => {
    if (rtNo === undefined) {
      return false
    }
    if (acNo !== undefined) {
      data = { ...data, acNo }
    }
    if (rtNo !== undefined) {
      data = { ...data, rtNo }
    }
    return data
  }
  const checkinDate = watch(`checkinDate${count}`)
  const checkoutDate = watch(`checkoutDate${count}`)

  const data = {
    cpNo: '1',
    name: '',
    startRow: '0',
    rowCount: '999',
  }

  useEffect(() => {
    reset()
  }, [selectedDate])

  const readRoomList = _.flow(addParameter, getFormDataFromJson, readRoomListSelector)
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readRoomList(data))
  const reset = useRecoilRefresher_UNSTABLE(readRoomList(data))

  // useEffect(() => {
  //   setRoom(list[0])
  // }, [])

  useEffect(() => {
    reset()
  }, [])

  const handleCurrentRoom = (event) => {
    const rmNo = event.target.value
    if (rmNo === '0') {
      setRoom({ originPrice: '', salePrice: '', providePrice: '' })
    } else {
      const findFromRmNo = _.find((roomType) => roomType.rmNo === Number(rmNo))
      const currentRoom = findFromRmNo(list)
      setRoom(currentRoom)
    }
  }

  return (
    <select onChange={handleCurrentRoom} defaultValue={room?.rmNo}>
      <option value={0}>객실명선택</option>
      {list.map(({ rmNo, name }) => (
        <option key={rmNo} value={rmNo}>
          {name}
        </option>
      ))}
    </select>
  )
}
