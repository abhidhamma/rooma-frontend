import { isDisplayReadReservationAtom, standardDateAtom } from '@state/reservation'
import { readReservationSelector } from '@state/reservationStatus/createReservation'
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

export default function ReadReservation() {
  const createReservationCallback = useApiCallback('updateReservation')
  const readReservationParameter = useRecoilValue(readReservationParameterAtom)
  const parameter = {
    rrNo: readReservationParameter.rrNo,
  }
  const result = useRecoilValue(readReservationSelector(parameter))
  const reservation = result?.data?.data
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

  const defaultValues = { ...reservation }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const [roomPrices, setRoomPrices] = useState({})
  const [addPersonPrices, setAddPersonPrices] = useState(0)
  const [optionPrices, setOptionPrices] = useState(0)
  const [totalPrices, setTotalPrices] = useState(0)
  const [rmNoObject, setRmNoObject] = useState([])

  useEffect(() => {
    setRoomCount(reservation.roomReserves.length)
  }, [readReservationParameter.rrNo])

  const { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice } = calculatePrices(
    roomCount,
    roomPrices,
    addPersonPrices,
    optionPrices,
    totalPrices
  )

  const addUpdateData = (data) => {
    data.roomReserves = data.roomReserves.map((roomReserve) => ({
      ...roomReserve,
      rrNo: readReservationParameter.rrNo,
    }))
    return data
  }
  const onSubmit = _.flow(
    validation(rmNoObject, roomCount),
    preprocessSubmitData(roomCount, rmNoObject, totalPrices),
    addUpdateData,
    createReservation(createReservationCallback, resetReadReservationPrice, setIsShowDimmdLayer)
  )
  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const close = () => {
    setIsShowDimmdLayer(false)
    setIsDisplayReadReservation(false)
    setRoomCount(1)
  }

  console.log('readData')
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
