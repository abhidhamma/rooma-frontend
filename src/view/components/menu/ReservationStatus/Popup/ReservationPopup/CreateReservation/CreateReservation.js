import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom, dimmdLayerAtom } from '@state/common/common'
import { isDisplayCreateReservationAtom, standardDateAtom } from '@state/reservation'
import {
  createReservationAtom,
  createReservationSelector,
} from '@state/reservationStatus/createReservation'
import {
  addReserverationRoomCountAtom,
  readReservationPriceSelector,
} from '@state/reservationStatus/reservationStatus'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { numberToArray } from '@util/common/lodash'
import { addDays } from 'date-fns'
import _ from 'lodash/fp'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { useRoomPrice } from '../common/reservationFunctions'
import { parseCustomData2 } from '@util/parse/parse'
import ReservationPopupForm from '../common/ReservationPopupForm'
import { zeroOrNumber } from '@util/common/others'

export default function CreateReservation() {
  const [roomPrices, setRoomPrices] = useState({})
  const [addPersonPrices, setAddPersonPrices] = useState(0)
  const [optionPrices, setOptionPrices] = useState(0)
  const [totalPrices, setTotalPrices] = useState(0)
  const [rmNoObject, setRmNoObject] = useState([])
  const [isReservationButtonOpen, setIsReservationButtonOpen] = useState(false)
  const [isCheckInButtonOpen, setIsCheckInButtonOpen] = useState(false)

  const [roomCount, setRoomCount] = useRecoilState(addReserverationRoomCountAtom)
  const setIsDisplayCreateReservation = useSetRecoilState(isDisplayCreateReservationAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)
  const popUpParameter = useRecoilValue(createReservationAtom)
  const createReservationCallback = useApiCallback('createReservation')
  const accommodation = useRecoilValue(currentAccommodationAtom)
  console.log(accommodation)
  const standardDate = useRecoilValue(standardDateAtom)
  const parameter = {
    acNo: accommodation?.acNo,
    startDate: formatyyyyMMddWithHyphen(addDays(standardDate, -5)),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }
  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const adjSalePrice = zeroOrNumber(watch('adjSalePrice'))
  const adjAddPersionPrice = zeroOrNumber(watch('adjAddPersionPrice'))
  const adjOptionPrice = zeroOrNumber(watch('adjOptionPrice'))
  const { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice } = calculatePrices(
    roomCount,
    roomPrices,
    addPersonPrices,
    optionPrices,
    totalPrices,
    adjSalePrice,
    adjAddPersionPrice,
    adjOptionPrice
  )
  // const checkinDate = formatyyyyMMddWithHyphen(popUpParameter.currentDate)
  // const checkoutDate = formatyyyyMMddWithHyphen(addDays(popUpParameter.currentDate, 1))

  const onSubmit = _.flow(
    validation(rmNoObject, roomCount),
    preprocessSubmitData(roomCount, rmNoObject, totalPrices, accommodation, totalPrice),
    createReservation(createReservationCallback),
    initializeCreateReservationForm(
      setIsDisplayCreateReservation,
      setRoomCount,
      setIsReservationButtonOpen,
      setIsCheckInButtonOpen,
      setIsShowDimmdLayer,
      resetReadReservationPrice
    )
  )
  const close = () => {
    setIsShowDimmdLayer(false)
    setIsDisplayCreateReservation(false)
    setRoomCount(1)
    setIsReservationButtonOpen(false)
    setIsCheckInButtonOpen(false)
  }

  return (
    <ReservationPopupForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      watch={watch}
      reset={reset}
      getValues={getValues}
      increaseRoom={increaseRoom}
      roomCount={roomCount}
      setRoomPrices={setRoomPrices}
      setAddPersonPrices={setAddPersonPrices}
      setOptionPrices={setOptionPrices}
      setTotalPrices={setTotalPrices}
      setRmNoObject={setRmNoObject}
      totalRoomPrice={totalRoomPrice}
      totalAddPersonPrice={totalAddPersonPrice}
      totalOptionPrice={totalOptionPrice}
      totalPrice={totalPrice}
      close={close}
    />
  )
}

const defaultValues = {
  // rrNo: 0,
  reserveStatus: 'RESERVECOMPLETE',
  payStatus: 'NOTPAY',
  // rmNo: 5,

  // payAmount: 50000,
  // reserveNum: '',
  // userName: '변경익',
  // userPhone: '010-1111-4444',
  // agentName: '회사',
  // agentPhone: '010-1111-2222',
  // agentCharger: '시스템담당자',
  // agentChargerPhone: '010-3333-4444',
  // adjSalePrice: 10000,
  // adjAddPersionPrice: 0,
  // adjOptionPrice: 0,
  // memo: '',
  // agentMemo: '',
  // fieldMemo: '',
}
export const calculatePrices = (
  roomCount,
  roomPrices,
  addPersonPrices,
  optionPrices,
  totalPrices,
  adjSalePrice,
  adjAddPersionPrice,
  adjOptionPrice
) => {
  let totalRoomPrice = 0
  let totalAddPersonPrice = 0
  let totalOptionPrice = 0
  let totalPrice = 0

  const eachTotalPrice = _.each((number) => {
    totalRoomPrice += roomPrices[`roomFee${number}`]
    totalAddPersonPrice += addPersonPrices[`addPersonFee${number}`]
    totalOptionPrice += optionPrices[`optionFee${number}`]

    totalPrice += totalPrices[`roomTotalFee${number}`]
  })
  _.flow(numberToArray, eachTotalPrice)(roomCount)
  totalPrice -= adjSalePrice + adjAddPersionPrice + adjOptionPrice
  return { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice }
}
export const validation = (rmNoObject, roomCount) => (submitData) => {
  for (let i = 1; i <= roomCount; i++) {
    if (rmNoObject[`${i}`] === 0) {
      alert('객실명을 선택해주세요.')
      return false
    }
  }

  const isUserNameNotExist = submitData.userName === ''
  if (isUserNameNotExist) {
    alert('실사용자명을 입력해주세요.')
    return false
  }
  const isUserPhoneNotExist = submitData.userPhone === ''
  if (isUserPhoneNotExist) {
    alert('연락번호를 입력해주세요.')
    return false
  }

  return submitData
}
export const preprocessSubmitData =
  (roomCount, rmNoObject, totalPrices, accommodation, totalPrice) => (submitData) => {
    if (submitData === false) {
      return false
    }
    const rmNo = rmNoObject['1']
    // const payAmount = totalPrices[`roomTotalFee1`]
    const payAmount = totalPrice
    const {
      rrNo,
      reserveStatus,
      payStatus,
      reserveNum,
      userName,
      userPhone,
      agentName,
      agentPhone,
      agentCharger,
      agentChargerPhone,
      adjSalePrice,
      adjAddPersionPrice,
      adjOptionPrice,
      memo,
      agentMemo,
      fieldMemo,
    } = submitData
    const roomReserves = makeRoomReserves(
      submitData,
      roomCount,
      rmNoObject,
      totalPrices,
      accommodation
    )

    return {
      rrNo,
      rmNo,
      reserveStatus,
      payStatus,
      payAmount,
      reserveNum,
      userName,
      userPhone,
      agentName,
      agentPhone,
      agentCharger,
      agentChargerPhone,
      adjSalePrice,
      adjAddPersionPrice,
      adjOptionPrice,
      memo,
      agentMemo,
      fieldMemo,
      roomReserves,
    }
  }
const makeRoomReserves = (submitData, roomCount, rmNoObject, totalPrices, accommodation) => {
  const mapRoomReservation = _.map((number) => {
    const checkinDate = submitData[`checkinDate${number}`]
    const checkoutDate = submitData[`checkoutDate${number}`]
    const stayNum = submitData[`stayNum${number}`]
    const salePrice = totalPrices[`roomTotalFee${number}`]
    const addPersionCon = `성인:${submitData[`adultCount${number}`]},소아:${
      submitData[`childCount${number}`]
    },유아:${submitData[`infantCount${number}`]}`
    const addBreakfastCon = `성인:${submitData[`adultBreakfastCount${number}`]},소아:${
      submitData[`childBreakfastCount${number}`]
    },유아:${submitData[`infantBreakfastCount${number}`]}`
    const optionNames = Object.keys(parseCustomData2(accommodation.addExtFee))
    const addOptionCon = optionNames
      .map(
        (optionName, index) =>
          `${optionName}:${submitData[`additionalOption${index + 1}Count${number}`]}`
      )
      .join(',')
    return {
      rrNo: 0,
      rmNo: rmNoObject[`${number}`],
      checkinDate,
      checkoutDate,
      stayNum,
      salePrice,
      addPersionCon,
      addBreakfastCon,
      addOptionCon,
    }
  })

  return _.flow(numberToArray, mapRoomReservation)(roomCount)
}
export const createReservation = (createReservationCallback) => (jsonData) => {
  if (jsonData === false) {
    return false
  }
  const isSuccess = createReservationCallback(createReservationSelector(jsonData)).then(
    (result) => {
      const { message } = result
      if (message === '업데이트 성공') {
        alert('예약이 저장되었습니다.')
        return true
      } else {
        alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
        return false
      }
    }
  )
  return isSuccess
}
export const initializeCreateReservationForm =
  (
    setIsDisplayCreateReservation,
    setRoomCount,
    setIsReservationButtonOpen,
    setIsCheckInButtonOpen,
    setIsShowDimmdLayer,
    resetReadReservationPrice
  ) =>
  (result) => {
    if (result instanceof Promise) {
      result.then((isSuccess) => {
        if (isSuccess) {
          setIsDisplayCreateReservation(false)
          setRoomCount(1)
          setIsReservationButtonOpen(false)
          setIsCheckInButtonOpen(false)
          setIsShowDimmdLayer(false)
          resetReadReservationPrice()
        }
      })
    } else {
      return
    }
  }
