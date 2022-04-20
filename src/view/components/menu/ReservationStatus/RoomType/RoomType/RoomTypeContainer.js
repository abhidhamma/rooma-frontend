import { useScroll } from '@hook/uiHook/useScroll'
import { currentAccommodationAtom } from '@state/common/common'
import { standardDateAtom } from '@state/reservation'
import { readReservationPriceSelector } from '@state/reservationStatus/reservationStatus'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import Loading from '../../Loading'
import RoomTypePresenter from './RoomTypePresenter'

export default function RoomTypeContainer() {
  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)

  //hook
  const { scrollY, canScrollCheck } = useScroll()

  const parameter = {
    acNo: accommodation?.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }

  const data = useRecoilValue(readReservationPriceSelector(parameter))
  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  useEffect(() => {
    return () => {
      resetReadReservationPrice()
    }
  }, [])

  useEffect(() => {
    if (scrollY > 0 && canScrollCheck) {
      setRenderRestRoomType(roomTypeListLength)
    }
  }, [scrollY])

  //지역상태
  const [renderRestRoomType, setRenderRestRoomType] = useState(15)

  //지역변수
  const roomTypeList = data?.data?.data === null ? [] : data.data.data.roomTypes
  const roomTypeListLength = data?.data?.data === null ? 0 : data.data.data.roomTypes.length
  console.log('roomTypeList')
  console.log(roomTypeList)

  const makeRoomTypes = (length) => {
    if (roomTypeListLength === 0 || typeof roomTypeList === 'undefined') {
      return
    }

    const roomTypes = roomTypeList
      // .slice(0, length)
      .filter((roomType) => roomType.roomPrices.length !== 0)
      .filter((roomType) => roomType.rooms.length !== 0)
      .map((roomType, index) => <RoomTypePresenter key={index} roomType={roomType} />)

    if (length === 15 && roomTypeListLength > 15) {
      roomTypes.push(<Loading />)
    }

    return roomTypes
  }
  return makeRoomTypes(renderRestRoomType) || <></>
}
