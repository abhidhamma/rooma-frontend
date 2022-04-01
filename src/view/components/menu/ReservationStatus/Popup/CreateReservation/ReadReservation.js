import { isDisplayReadReservationAtom } from '@state/reservation'
import { readReservationSelector } from '@state/reservationStatus/createReservation'
import { addReserverationRoomCountAtom, rrNoAtom } from '@state/reservationStatus/reservationStatus'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { calculatePrices, initializeCreateReservationForm } from './CreateReservation'
import ReservationPopupForm from './ReservationPopupForm'

export default function ReadReservation() {
  console.log('ReadReservation called...')
  const rrNo = useRecoilValue(rrNoAtom)
  const parameter = {
    rrNo,
  }
  const result = useRecoilValue(readReservationSelector(parameter))
  const reservation = result?.data?.data
  console.log(reservation)
  const [roomCount, setRoomCount] = useRecoilState(addReserverationRoomCountAtom)
  const setIsDisplayReadReservation = useSetRecoilState(isDisplayReadReservationAtom)

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

  const onSubmit = () => {}
  const increaseRoom = () => setRoomCount((prev) => prev + 1)

  const close = () => {
    setIsDisplayReadReservation(false)
    setRoomCount(1)
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
      setDisplay={setIsDisplayReadReservation}
      reservation={reservation}
      type={'read'}
      initializeCreateReservationForm={initializeCreateReservationForm}
      close={close}
    />
  )
}
