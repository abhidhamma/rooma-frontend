import { addReserverationRoomCountAtom } from '@state/reservationStatus/reservationStatus'
import { useRecoilValue } from 'recoil'
import { map, flow } from 'lodash/fp'
import { numberToArray } from '@util/common/lodash'
import { useState } from 'react'

//예약관련 함수를 처리하는곳
export const useTotalPrice = () => {
  const totalRoomPrice = 0
  const totalAddPersonPrice = 0
  const totalRestOptionPrice = 0
  return { totalRoomPrice, totalAddPersonPrice, totalRestOptionPrice }
}

//먼저 각 room의 값을 계산해야한다
export const useRoomPrice = (roomCount, watch) => {
  const [roomType, setRoomType] = useState()
  /**
   * 계산해야할 항목
   * 1.roomPrice => 가져와보자
   *
   */
  console.log(roomCount)
  console.log(roomType)

  const mapRoomPrice = map((roomCount) => ({
    [`room${roomCount}Price`]: 0,
    [`room${roomCount}OptionPrice`]: 0,
    [`room${roomCount}AddPersonPrice`]: 0,
    [`room${roomCount}RestOptionPrice`]: 0,
    [`room${roomCount}TotalPrice`]: 0,
  }))
  const calculateRoomPrice = flow(numberToArray, mapRoomPrice)
  return [roomType, setRoomType]
}
