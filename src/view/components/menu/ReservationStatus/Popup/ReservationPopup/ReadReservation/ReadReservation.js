import { isDisplayReadReservationAtom } from '@state/reservation'
import { readReservationSelector } from '@state/reservationStatus/createReservation'
import {
  addReserverationRoomCountAtom,
  readReservationParameterAtom,
} from '@state/reservationStatus/reservationStatus'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  calculatePrices,
  initializeCreateReservationForm,
} from '../CreateReservation/CreateReservation'
import ReservationPopupForm from '../common/ReservationPopupForm'
import { dimmdLayerAtom } from '@state/common/common'

export default function ReadReservation() {
  const readReservationParameter = useRecoilValue(readReservationParameterAtom)
  const parameter = {
    rrNo: readReservationParameter.rrNo,
  }
  const result = useRecoilValue(readReservationSelector(parameter))
  const reservation = result?.data?.data
  const [roomCount, setRoomCount] = useRecoilState(addReserverationRoomCountAtom)
  const setIsDisplayReadReservation = useSetRecoilState(isDisplayReadReservationAtom)
  const setIsShowDimmdLayer = useSetRecoilState(dimmdLayerAtom)

  const defaultValues = { ...reservation }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const [roomPrices, setRoomPrices] = useState({})
  const [addPersonPrices, setAddPersonPrices] = useState(0)
  const [optionPrices, setOptionPrices] = useState(0)
  const [totalPrices, setTotalPrices] = useState(0)
  const [rmNoObject, setRmNoObject] = useState([])

  const { totalRoomPrice, totalAddPersonPrice, totalOptionPrice, totalPrice } = calculatePrices(
    roomCount,
    roomPrices,
    addPersonPrices,
    optionPrices,
    totalPrices
  )

  const onSubmit = (submitData) => {
    console.log(submitData)
  }
  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const close = () => {
    setIsShowDimmdLayer(false)
    setIsDisplayReadReservation(false)
    setRoomCount(1)
  }
  console.log('ReadReservation called...')
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
