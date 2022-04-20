import { isDisplayReadReservationAtom, standardDateAtom } from '@state/reservation'
import {
  payFormCountAtom,
  readReservationSelector,
} from '@state/reservationStatus/createReservation'
import {
  addReserverationRoomCountAtom,
  readReservationParameterAtom,
  readReservationPriceSelector,
} from '@state/reservationStatus/reservationStatus'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import {
  calculatePrices,
  initializeCreateReservationForm,
  preprocessSubmitData,
  validation,
} from '../CreateReservation/CreateReservation'
import ReservationPopupForm from '../common/ReservationPopupForm'
import { currentAccommodationAtom, dimmdLayerAtom } from '@state/common/common'
import { createReservation } from '../CreateReservation/CreateReservation'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { addDays } from 'date-fns'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import _ from 'lodash/fp'
import { zeroOrNumber } from '@util/common/others'
import { numberToArray } from '@util/common/lodash'

export default function ReadReservation() {
  const createReservationCallback = useApiCallback('updateReservation')
  const readReservationParameter = useRecoilValue(readReservationParameterAtom)
  const parameter = {
    rrNo: readReservationParameter.rrNo,
  }
  const result = useRecoilValue(readReservationSelector(parameter))
  const resetReadReservation = useRecoilRefresher_UNSTABLE(readReservationSelector(parameter))
  const reservation = result?.data?.data
  console.log('reservation')
  console.log(reservation)
  const [roomCount, setRoomCount] = useRecoilState(addReserverationRoomCountAtom)
  const setIsDisplayReadReservation = useSetRecoilState(isDisplayReadReservationAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)

  const accommodation = useRecoilValue(currentAccommodationAtom)
  const standardDate = useRecoilValue(standardDateAtom)
  const readReservationPriceParameter = {
    acNo: accommodation.acNo,
    startDate: formatyyyyMMddWithHyphen(standardDate),
    endDate: formatyyyyMMddWithHyphen(addDays(standardDate, 29)),
  }
  const resetReadReservationPrice = useRecoilRefresher_UNSTABLE(
    readReservationPriceSelector(readReservationPriceParameter)
  )
  const payFormCount = useRecoilValue(payFormCountAtom)

  const payDefaultValues = () => {
    if (reservation?.payHists === undefined) {
      return {}
    } else {
      // payGubun, payAmount, payDate, payMethod
      const payHistoryList = reservation?.payHists
      const length = payHistoryList.length
      let tempMap = {}
      numberToArray(length).forEach((number) => {
        const payHistory = payHistoryList[number - 1]
        tempMap = {
          ...tempMap,
          [`payGubun${number}`]: payHistory.payGubun,
          [`payAmount${number}`]: payHistory.payAmount,
          [`payDate${number}`]: payHistory.payDate,
          [`payMethod${number}`]: payHistory.payMethod,
        }
      })

      return tempMap
    }
  }
  const defaultValues = { ...reservation, ...payDefaultValues() }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const [roomPrices, setRoomPrices] = useState({})
  const [addPersonPrices, setAddPersonPrices] = useState(0)
  const [optionPrices, setOptionPrices] = useState(0)
  const [totalPrices, setTotalPrices] = useState(0)
  const [rmNoObject, setRmNoObject] = useState([])

  useEffect(() => {
    setRoomCount(reservation.roomReserves.length)
  }, [readReservationParameter.rrNo])

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

  const addUpdateData = (data) => {
    //roomReserves에 rrNo넣기
    data.roomReserves = data.roomReserves.map((roomReserve, index) => {
      const rrNo =
        reservation?.roomReserves[index]?.rrNo === undefined
          ? 0
          : reservation?.roomReserves[index]?.rrNo
      return {
        ...roomReserve,
        rrNo,
      }
    })

    //payHists넣기
    let payHists = []
    const payHistoryList = reservation?.payHists
    const length = payHistoryList.length

    // numberToArray(payFormCount).forEach((number) => {
    //   payHists = [
    //     ...payHists,
    //     {
    //       rpNo: 0,
    //       reserveNum: data.reserveNum,
    //       payGubun: watch(`payGubun${number}`),
    //       payAmount: watch(`payAmount${number}`),
    //       payDate: watch(`payDate${number}`),
    //       payMethod: watch(`payMethod${number}`),
    //     },
    //   ]
    // })

    for (let i = 0; i < payFormCount - length; i++) {
      const number = i + length + 1
      payHists = [
        ...payHists,
        {
          rpNo: 0,
          reserveNum: data.reserveNum,
          payGubun: watch(`payGubun${number}`),
          payAmount: watch(`payAmount${number}`),
          payDate: watch(`payDate${number}`),
          payMethod: watch(`payMethod${number}`),
        },
      ]
    }
    data = { ...data, payHists }

    // console.log('addUpdateData')
    // console.log(data)
    return data
  }
  const resetReservationForm = (result) => {
    if (result instanceof Promise) {
      result.then((isSuccess) => {
        if (isSuccess) {
          resetReadReservation()
        }
      })
    } else {
      return
    }
  }
  const onSubmit = _.flow(
    validation(rmNoObject, roomCount),
    preprocessSubmitData(roomCount, rmNoObject, totalPrices, accommodation, totalPrice),
    addUpdateData,
    createReservation(createReservationCallback, resetReadReservationPrice, setIsShowDimmdLayer),
    resetReservationForm
  )
  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const close = () => {
    setIsShowDimmdLayer(false)
    setIsDisplayReadReservation(false)
    setRoomCount(1)
  }
  console.log('ReadReservation')
  console.log(reservation)

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
      setDisplay={setIsDisplayReadReservation}
      reservation={reservation}
      type={'read'}
      initializeCreateReservationForm={initializeCreateReservationForm}
      close={close}
    />
  )
}
