import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import { readRoomTypeSelector, updateRoomTypeSelector } from '@state/accommodation/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { numberToArray } from '@util/common/lodash'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { preprocessData } from './CreateRoomType'
import RoomTypeForm from './Form'

export default function UpdateRoomType() {
  console.log('UpdateRoomType render...')
  //path variable받아오기
  let { roomTypeId } = useParams()
  const rtNo = roomTypeId
  const addRtNo = (data) => {
    console.log('addRtNo')
    console.log(data)
    return { ...data, rtNo }
  }

  const updateRoomTypeCallback = useUpdateAccommodationCallback('update roomType')
  let navigate = useNavigate()

  const {
    data: { data: roomTypeData },
  } = useRecoilValue(readRoomTypeSelector({ rtNo }))
  const resetReadRoomTypeSelector = useRecoilRefresher_UNSTABLE(readRoomTypeSelector({ rtNo }))

  const split = _.split('|')
  //객실설정
  const putRoomsEffect = (defaultValues) => {
    const roomNames = split(defaultValues.roomNames).filter((_, index) => index > 2)
    const roomSettings = split(defaultValues.roomNames).filter((_, index) => index < 3)
    defaultValues = {
      ...defaultValues,
      prefix: roomSettings[0],
      roomNumber: roomSettings[1],
      suffix: roomSettings[2],
    }

    const length = () => roomNames.length
    const eachRoom = _.each(
      (number) => (defaultValues = { ...defaultValues, [`room${number}`]: roomNames[number - 1] })
    )
    _.flow(length, numberToArray, eachRoom)(defaultValues)
    return defaultValues
  }

  //조식추가, 기타사항
  const makeBreakFastPriceInput = (defaultValues) => {
    const [addBreakfastConfigName, addBreakfastConfigPrice] = split(
      defaultValues.addBreakfastConfig
    )
    return {
      ...defaultValues,
      addBreakfastConfigName,
      addBreakfastConfigPrice,
    }
  }
  const makeEtcPriceInput = (defaultValues) => {
    const [addEtcConfigName, addEtcConfigPrice] = split(defaultValues.addEtcConfig)
    return {
      ...defaultValues,
      addEtcConfigName,
      addEtcConfigPrice,
    }
  }

  //기타옵션
  const makeRoomOptionInputs = (defaultValues) => {
    const roomOptionArray = split(defaultValues.roomOptions)
    const checkBoxMap = {
      [`조식`]: 'check1',
      [`취사기능`]: 'check2',
      [`풀빌라`]: 'check3',
      [`월풀(자쿠지)`]: 'check4',
      [`화장실2개이상`]: 'check5',
      [`단독(독채)형`]: 'check6',
      [`복층형`]: 'check7',
      [`순수온돌방`]: 'check8',
    }
    const eachRoomOption = _.each((roomOption) => {
      const name = checkBoxMap[roomOption]
      defaultValues = { ...defaultValues, [name]: true }
    })
    eachRoomOption(roomOptionArray)
    return defaultValues
  }

  const preprocessDefaultValues = (defaultValues) => {
    //prefix, roomNumber, suffix 추가
    defaultValues = { ...defaultValues, prefix: '', roomNumber: '', suffix: '' }
    //방번호 나눠 넣기
    defaultValues = putRoomsEffect(defaultValues)
    //조식추가 나누기
    defaultValues = makeBreakFastPriceInput(defaultValues)
    //기타사항 나누기
    defaultValues = makeEtcPriceInput(defaultValues)
    //기타옵션 나누기
    defaultValues = makeRoomOptionInputs(defaultValues)
    // ...
    return defaultValues
  }

  const defaultValues = preprocessDefaultValues(roomTypeData)
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  useEffect(() => {
    reset({ ...defaultValues })
    return () => resetReadRoomTypeSelector()
  }, [])

  const onSubmit = _.flow(
    addRtNo,
    preprocessData,
    getFormDataFromJson,
    updateRoomType(updateRoomTypeCallback, navigate)
  )
  // const consol = (submitData) => console.log(submitData)
  // const onSubmit = consol

  return (
    <RoomTypeForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitText={'수정'}
      titleText={'객실타입수정'}
      watch={watch}
      reset={reset}
      getValues={getValues}
    />
  )
}

const updateRoomType = (updateRoomTypeCallback, navigate) => (formData) => {
  updateRoomTypeCallback(updateRoomTypeSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('수정되었습니다.')
      navigate('/accommodationManagement/roomType')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
