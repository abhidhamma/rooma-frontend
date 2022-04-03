import { readRoomListSelector } from '@state/accommodationManagement/room'
import { selectedDateAtom } from '@state/common/calendar'
import { readPossibleRoomListSelector } from '@state/reservationStatus/createReservation'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function CreateReservationRoomSelect({ roomType, room, setRoom, count, watch }) {
  // const { acNo } = useRecoilValue(currentAccommodationAtom)
  const selectedDate = useRecoilValue(selectedDateAtom)
  const { rtNo } = roomType
  const addParameter = (data) => {
    if (rtNo !== undefined) {
      data = { ...data, rtNo }
    }
    return false
  }
  const checkinDate = watch(`checkinDate${count}`)
  const checkoutDate = watch(`checkoutDate${count}`)

  let parameter = {
    startDate: watch(`checkinDate${count}`),
    endDate: watch(`checkoutDate${count}`),
  }

  useEffect(() => {
    reset()
  }, [selectedDate])

  const readPossibleRoomList = _.flow(addParameter, readPossibleRoomListSelector)
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readPossibleRoomList(parameter))
  const reset = useRecoilRefresher_UNSTABLE(readPossibleRoomList(parameter))
  console.log('RoomSelect called...')
  console.log(parameter, rtNo, list)

  useEffect(() => {
    setRoom(list[0])
  }, [])

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
      {list.map(({ rmNo, name }) => (
        <option key={rmNo} value={rmNo}>
          {name}
        </option>
      ))}
    </select>
  )
}
