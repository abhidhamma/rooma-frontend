import useApiCallback from '@hook/apiHook/useApiCallback'
import { currentAccommodationAtom } from '@state/common/common'
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
import ReservationPopupForm from './ReservationPopupForm'

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
  const popUpParameter = useRecoilValue(createReservationAtom)
  const createReservationCallback = useApiCallback('createReservation')
  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const parameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }
  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(parameter)
  )

  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice } = calculatePrices(
    roomCount,
    roomPrices,
    addPersonPrices,
    optionPrices,
    totalPrices
  )
  const checkinDate = formatyyyyMMddWithHyphen(popUpParameter.currentDate)
  const checkoutDate = formatyyyyMMddWithHyphen(addDays(popUpParameter.currentDate, 1))

  const onSubmit = _.flow(
    preprocessSubmitData(checkinDate, checkoutDate, roomCount, rmNoObject, totalPrices),
    createReservation(createReservationCallback, resetReadReservationPrice),
    initializeCreateReservationForm(
      setIsDisplayCreateReservation,
      setRoomCount,
      setIsReservationButtonOpen,
      setIsCheckInButtonOpen
    )
  )
  const close = () => {
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
  rmNo: 5,
  reserveStatus: 'RESERVECOMPLETE',
  payStatus: 'NOTPAY',
  payAmount: 50000,
  reserveNum: '',
  userName: '변경익',
  userPhone: '010-1111-4444',
  agentName: '회사',
  agentPhone: '010-1111-2222',
  agentCharger: '시스템담당자',
  agentChargerPhone: '010-3333-4444',
  adjSalePrice: 10000,
  adjAddPersionPrice: 0,
  adjOptionPrice: 0,
  memo: '',
  agentMemo: '',
  fieldMemo: '',
}
export const calculatePrices = (
  roomCount,
  roomPrices,
  addPersonPrices,
  optionPrices,
  totalPrices
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
  return { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice }
}
const preprocessSubmitData =
  (checkinDate, checkoutDate, roomCount, rmNoObject, totalPrices) => (submitData) => {
    const rmNo = rmNoObject['1']
    const payAmount = totalPrices[`roomTotalFee1`]
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
      checkinDate,
      checkoutDate,
      roomCount,
      rmNoObject,
      totalPrices
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
const makeRoomReserves = (
  submitData,
  checkinDate,
  checkoutDate,
  roomCount,
  rmNoObject,
  totalPrices
) => {
  const mapRoomReservation = _.map((number) => {
    const stayNum = submitData[`stayNum${number}`]
    const salePrice = totalPrices[`roomTotalFee${number}`]
    const addPersionCon = `성인:${submitData[`adultCount${number}`]},소아:${
      submitData[`childCount${number}`]
    },유아:${submitData[`childCount${number}`]}`
    const addBreakfastCon = `성인:${submitData[`adultBreakfastCount${number}`]},소아:${
      submitData[`childBreakfastCount${number}`]
    },유아:${submitData[`infantBreakfastCount${number}`]}`
    return {
      rrNo: 0,
      rmNo: rmNoObject[`${number}`],
      checkinDate,
      checkoutDate,
      stayNum,
      salePrice,
      addPersionCon,
      addBreakfastCon,
      addOptionCon: '바베큐',
    }
  })

  return _.flow(numberToArray, mapRoomReservation)(roomCount)
}
const createReservation =
  (createReservationCallback, resetReadReservationPrice) => async (jsonData) => {
    const isSuccess = await createReservationCallback(createReservationSelector(jsonData)).then(
      (result) => {
        console.log(result)
        const { message } = result
        if (message === '업데이트 성공') {
          alert('예약이 완료되었습니다.')
          resetReadReservationPrice()
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
    setIsCheckInButtonOpen
  ) =>
  (promise) => {
    promise.then((isSuccess) => {
      if (isSuccess) {
        setIsDisplayCreateReservation(false)
        setRoomCount(1)
        setIsReservationButtonOpen(false)
        setIsCheckInButtonOpen(false)
      }
    })
  }
