import { currentAccommodationAtom } from '@state/common/common'
import { createReservationAtom } from '@state/reservationStatus/createReservation'
import { addReserverationRoomCountAtom } from '@state/reservationStatus/reservationStatus'
import { zeroOrNumber } from '@util/common/others'
import { parseCustomData2 } from '@util/parse/parse'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  calculateTotalAdditionalOptionFee,
  calculateTotalBreakFastFee,
} from './ReadReservationAddRoomFunction'
import ReadReservationAddRoomPresenter from './ReadReservationAddRoomPresenter'

export default function ReadReservationAddRoomContainer({
  cancelButton,
  register,
  watch,
  count,
  getValues,
  setRoomPrices,
  setAddPersonPrices,
  setOptionPrices,
  setTotalPrices,
  setRmNoObject,
  reset,
  roomReservation,
}) {
  const parseRoomReservation = () => {
    const { addPersionCon, addBreakfastCon } = roomReservation
    const addPersonArray = addPersionCon.split(',')
    const addBreakfastArray = addBreakfastCon.split(',')
    const getPersonCount = (data) => data.split(':')[1]
    const adult = getPersonCount(addPersonArray[0])
    const child = getPersonCount(addPersonArray[1])
    const infant = getPersonCount(addPersonArray[2])
    const adultBreakfast = getPersonCount(addBreakfastArray[0])
    const childBreakfast = getPersonCount(addBreakfastArray[1])
    const infantBreakfast = getPersonCount(addBreakfastArray[2])
    return { adult, child, infant, adultBreakfast, childBreakfast, infantBreakfast }
  }
  const { adult, child, infant, adultBreakfast, childBreakfast, infantBreakfast } =
    parseRoomReservation()

  //전역상태
  const setRoomCount = useSetRecoilState(addReserverationRoomCountAtom)
  const [createReservation, setCreateReservation] = useRecoilState(createReservationAtom)
  const accommodation = useRecoilValue(currentAccommodationAtom)

  //지역상태
  const [open, setOpen] = useState(false)
  const [room, setRoom] = useState({ rmNo: roomReservation.rmNo })
  const [roomType, setRoomType] = useState({
    basicPersionNum: 2,
    maxPersionNum: 4,
    originPrice: 0,
    addAdultPrice: 0,
    addChildPrice: 0,
    addInfantPrice: 0,
    rtNo: roomReservation.rtNo,
  })

  //변수
  const startDate = roomReservation.checkinDate
  const endDate = roomReservation.checkoutDate

  const { addBreakfastFee, addExtFee } = accommodation
  const {
    basicPersionNum,
    maxPersionNum,
    originPrice,
    addAdultPrice,
    addChildPrice,
    addInfantPrice,
  } = roomType
  const rmNo = room?.rmNo

  const breakfastFeeObject = Object.entries(parseCustomData2(addBreakfastFee)).filter(
    (element) => !isNaN(Number(element[1]))
  )
  const breakfastFeeObjectLength = breakfastFeeObject.length

  const extFeeObject = Object.entries(parseCustomData2(addExtFee))
  const extFeeObjectLength = extFeeObject.length

  const adultCount = zeroOrNumber(watch(`adultCount${count}`))
  const childCount = zeroOrNumber(watch(`childCount${count}`))
  const infantCount = zeroOrNumber(watch(`infantCount${count}`))
  const adultBreakFastCount = zeroOrNumber(watch(`adultBreakfastCount${count}`))
  const childBreakFastCount = zeroOrNumber(watch(`childBreakfastCount${count}`))
  const infantBreakFastCount = zeroOrNumber(watch(`infantBreakfastCount${count}`))
  const addtionalOption1Count = zeroOrNumber(watch(`additionalOption1Count${count}`))
  const addtionalOption2Count = zeroOrNumber(watch(`additionalOption2Count${count}`))
  const addtionalOption3Count = zeroOrNumber(watch(`additionalOption3Count${count}`))

  const addPersonFee =
    Number(addAdultPrice) * adultCount +
    Number(addChildPrice) * childCount +
    Number(addInfantPrice) * infantCount
  const breakFastFee = calculateTotalBreakFastFee(
    breakfastFeeObject,
    adultBreakFastCount,
    childBreakFastCount,
    infantBreakFastCount
  )

  const additionalOptionFee = calculateTotalAdditionalOptionFee(
    extFeeObject,
    addtionalOption1Count,
    addtionalOption2Count,
    addtionalOption3Count
  )
  const optionFee = addPersonFee + breakFastFee + additionalOptionFee
  const roomTotalFee = Number(originPrice) + Number(optionFee)

  //추가인원으로 등록가능한 총 숫자
  const addPersonLimit = maxPersionNum - basicPersionNum

  //요금 계산용 필드
  const roomFee = Number(originPrice)
  const optionWithoutAddPersonFee = breakFastFee + additionalOptionFee

  const handleToggle = () => setOpen((prev) => !prev)
  const decreaseRoomCount = () => setRoomCount((prev) => prev - 1)

  useEffect(() => {
    setRoomType((prev) => ({ ...prev, rtNo: roomReservation.rtNo }))
  }, [])
  useEffect(() => {
    setRoomPrices((prev) => ({ ...prev, [`roomFee${count}`]: roomFee }))
  }, [roomType])
  useEffect(() => {
    setAddPersonPrices((prev) => ({ ...prev, [`addPersonFee${count}`]: addPersonFee }))
  }, [addPersonFee])
  useEffect(() => {
    setOptionPrices((prev) => ({ ...prev, [`optionFee${count}`]: optionWithoutAddPersonFee }))
  }, [optionWithoutAddPersonFee])
  useEffect(() => {
    setTotalPrices((prev) => ({ ...prev, [`roomTotalFee${count}`]: roomTotalFee }))
  }, [roomTotalFee])
  useEffect(() => {
    setRmNoObject((prev) => ({ ...prev, [`${count}`]: rmNo }))
    return () => {
      setRmNoObject((prev) => _.omit(prev, `${count}`))
    }
  }, [rmNo])
  useEffect(() => {
    reset({ ...getValues(), [`stayNum${count}`]: basicPersionNum })
  }, [basicPersionNum])
  return (
    <ReadReservationAddRoomPresenter
      //1.useForm
      register={register}
      reset={reset}
      watch={watch}
      getValues={getValues}
      //2.ui상태
      handleToggle={handleToggle}
      decreaseRoomCount={decreaseRoomCount}
      cancelButton={cancelButton}
      open={open}
      //3.예약객실정보
      roomType={roomType}
      setRoomType={setRoomType}
      room={room}
      setRoom={setRoom}
      startDate={startDate}
      endDate={endDate}
      basicPersionNum={basicPersionNum}
      maxPersionNum={maxPersionNum}
      //4.예약옵션정보
      //인원추가
      adult={adult}
      child={child}
      infant={infant}
      //조식추가
      adultBreakfast={adultBreakfast}
      childBreakfast={childBreakfast}
      infantBreakfast={infantBreakfast}
      breakfastFeeObjectLength={breakfastFeeObjectLength}
      breakfastFeeObject={breakfastFeeObject}
      //옵션추가
      extFeeObject={extFeeObject}
      extFeeObjectLength={extFeeObjectLength}
      //옵션합계
      optionFee={optionFee}
      //요금합계
      roomTotalFee={roomTotalFee}
      //5.common
      count={count}
      addPersonFee={addPersonFee}
      optionWithoutAddPersonFee={optionWithoutAddPersonFee}
      roomFee={roomFee}
      originPrice={originPrice}
    />
  )
}
