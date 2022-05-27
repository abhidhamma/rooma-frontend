import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import { readRoomListSelector } from '@state/accommodationManagement/room'
import {
  breakfastConfigOptionCountAtom,
  etcConfigOptionCountAtom,
  readRoomTypeSelector,
  updateRoomTypeSelector,
} from '@state/accommodationManagement/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import { numberToArray } from '@util/common/lodash'
import { validateRoomTypeForm } from '@util/validation/validateRoomTypeForm'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'
import { preprocessRoomTypeFormData } from './CreateRoomType'
import RoomTypeForm from './Form'

export default function UpdateRoomType() {
  //path variable받아오기
  let { roomTypeId } = useParams()
  const rtNo = roomTypeId
  const addRtNo = (data) => ({ ...data, rtNo })

  const updateRoomTypeCallback = useUpdateAccommodationCallback('update roomType')
  let navigate = useNavigate()

  const user = loadItem('user')
  const parameter = {
    cpNo: user.cpNo,
    name: '',
    startRow: '0',
    rowCount: '999',
  }
  const {
    data: {
      data: { list: roomList, totalCount: roomTotalNum },
    },
  } = useRecoilValue(readRoomListSelector(getFormDataFromJson(addRtNo(parameter))))
  // const resetReadRoomListSelector = useRecoilRefresher_UNSTABLE(
  //   readRoomListSelector(getFormDataFromJson(data))
  // )
  console.log('roomList')
  console.log(roomList, roomTotalNum)

  const {
    data: { data: roomTypeData },
  } = useRecoilValue(readRoomTypeSelector({ rtNo }))
  const resetReadRoomTypeSelector = useRecoilRefresher_UNSTABLE(readRoomTypeSelector({ rtNo }))
  console.log('roomType')
  console.log(roomTypeData)

  const acNo = roomTypeData.acNo

  const [breakfastConfigOptionCount, setBreakfastConfigOptionCount] = useRecoilState(
    breakfastConfigOptionCountAtom
  )
  const [etcConfigOptionCount, setEtcConfigOptionCount] = useRecoilState(etcConfigOptionCountAtom)

  const splitComma = _.split(',')
  const splitBar = _.split('||')
  const splitSlash = _.split('//')
  //객실설정
  const putRoomsEffect = (defaultValues) => {
    const roomListArray = roomList.map(({ rmNo, name }) => ({ rmNo, name }))
    // const roomNames = splitComma(defaultValues.roomNames)
    const roomSettings = splitBar(defaultValues.roomMakeConfig)
    defaultValues = {
      ...defaultValues,
      prefix: roomSettings[0],
      roomNumber: roomSettings[1],
      suffix: roomSettings[2],
    }

    const length = () => roomListArray.length
    const eachRoom = _.each(
      (number) =>
        (defaultValues = {
          ...defaultValues,
          [`room${number}`]: roomListArray[number - 1].name,
        })
    )
    _.flow(length, numberToArray, eachRoom)(defaultValues)
    return defaultValues
  }

  //조식추가, 기타사항
  const makeBreakFastConfigInput = (defaultValues) => {
    const addBreakfastConfigArray = splitSlash(defaultValues.addBreakfastConfig)
    const getOptionCount = (addBreakfastConfigArray) => addBreakfastConfigArray.length - 3

    const eachOption = _.each((number) => {
      const [addBreakfastConfigName, addBreakfastConfigPrice] = splitBar(
        addBreakfastConfigArray[number - 1]
      )
      defaultValues = {
        ...defaultValues,
        [`addBreakfastConfigName${number}`]: addBreakfastConfigName,
        [`addBreakfastConfigPrice${number}`]: addBreakfastConfigPrice,
      }
    })
    const addDefaultBreakfastPrice = () => {
      const length = addBreakfastConfigArray.length
      const [adultBreakfastName, adultBreakfastPrice] = splitBar(
        addBreakfastConfigArray[length - 1]
      )
      const [childBreakfastName, childBreakfastPrice] = splitBar(
        addBreakfastConfigArray[length - 2]
      )
      const [infantBreakfastName, infantBreakfastPrice] = splitBar(
        addBreakfastConfigArray[length - 3]
      )
      defaultValues = {
        ...defaultValues,
        adultBreakfastName,
        adultBreakfastPrice,
        childBreakfastName,
        childBreakfastPrice,
        infantBreakfastName,
        infantBreakfastPrice,
      }
    }
    _.flow(getOptionCount, numberToArray, eachOption)(addBreakfastConfigArray)
    addDefaultBreakfastPrice()
    return defaultValues
  }
  const makeEtcConfigInput = (defaultValues) => {
    const addEtcConfigArray = splitSlash(defaultValues.addEtcConfig)
    const getOptionCount = (addEtcConfigArray) => addEtcConfigArray.length

    const eachOption = _.each((number) => {
      const [addEtcConfigName, addEtcConfigPrice] = splitBar(addEtcConfigArray[number - 1])
      defaultValues = {
        ...defaultValues,
        [`addEtcConfigName${number}`]: addEtcConfigName,
        [`addEtcConfigPrice${number}`]: addEtcConfigPrice,
      }
    })
    _.flow(getOptionCount, numberToArray, eachOption)(addEtcConfigArray)
    return defaultValues
  }

  //기타옵션
  const makeRoomOptionInputs = (defaultValues) => {
    const roomOptionArray = splitBar(defaultValues.roomOptions)
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
    //roomTotalNum추가
    defaultValues = { ...defaultValues, roomTotalNum: roomTotalNum }
    //prefix, roomNumber, suffix 추가
    defaultValues = { ...defaultValues, prefix: '', roomNumber: '', suffix: '' }
    //방번호 나눠 넣기
    defaultValues = putRoomsEffect(defaultValues)
    //조식추가 나누기
    defaultValues = makeBreakFastConfigInput(defaultValues)
    //기타사항 나누기
    defaultValues = makeEtcConfigInput(defaultValues)
    //기타옵션 나누기
    defaultValues = makeRoomOptionInputs(defaultValues)
    // ...
    return defaultValues
  }

  const defaultValues = preprocessDefaultValues(roomTypeData)
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  useEffect(() => {
    reset({ ...defaultValues })
    setBreakfastConfigOptionCount(splitSlash(roomTypeData.addBreakfastConfig).length - 3)
    setEtcConfigOptionCount(splitSlash(roomTypeData.addEtcConfig).length)
    return () => resetReadRoomTypeSelector()
  }, [])

  const onSubmit = _.flow(
    addRtNo,
    validateRoomTypeForm,
    preprocessRoomTypeFormData(breakfastConfigOptionCount, etcConfigOptionCount),
    getFormDataFromJson,
    updateRoomType(updateRoomTypeCallback, navigate)
  )

  return (
    <RoomTypeForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      formType={'수정'}
      titleText={'객실타입수정'}
      watch={watch}
      reset={reset}
      getValues={getValues}
      rtNo={rtNo}
      acNo={acNo}
    />
  )
}

const updateRoomType = (updateRoomTypeCallback, navigate) => (formData) => {
  if (formData === false) {
    return false
  }
  updateRoomTypeCallback(updateRoomTypeSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('수정되었습니다.')
      navigate('/accommodation/roomType/list')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
