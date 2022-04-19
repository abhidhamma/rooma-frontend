import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import {
  breakfastOptionCountAtom,
  extOptionCountAtom,
  readAccommodationSelector,
  updateAccommodationSelector,
} from '@state/accommodationManagement/accommodation'
import AccommodationForm from './Form'
import { preprocessAccommodationFormData } from './CreateAccommodation'
import { numberToArray } from '@util/common/lodash'
import { ACCOMMODATION_LIST_URL } from '@constant/locationURLs'

export default function UpdateAccommodation() {
  //path variable받아오기
  let { accommodationId } = useParams()
  const acNo = accommodationId
  const addAcNo = (data) => ({ ...data, acNo })

  const updateAccommodationCallback = useUpdateAccommodationCallback('update Accommodation')
  let navigate = useNavigate()

  const {
    data: { data: accommodationData },
  } = useRecoilValue(readAccommodationSelector({ acNo }))
  const resetReadAccommodationSelector = useRecoilRefresher_UNSTABLE(
    readAccommodationSelector({ acNo })
  )
  console.log(accommodationData)

  const [breakfastOptionCount, setBreakfastOptionCount] = useRecoilState(breakfastOptionCountAtom)
  const [extOptionCount, setExtOptionCount] = useRecoilState(extOptionCountAtom)

  const splitBar = _.split('||')
  const splitSlash = _.split('//')

  //조식추가, 기타사항
  const makeBreakFastFeeInput = (defaultValues) => {
    const addBreakfastFeeArray = splitSlash(defaultValues.addBreakfastFee)
    const getOptionCount = (addBreakfastArray) => addBreakfastArray.length - 3

    const eachOption = _.each((number) => {
      const [addBreakfastName, addBreakfastPrice] = splitBar(addBreakfastFeeArray[number - 1])
      defaultValues = {
        ...defaultValues,
        [`addBreakfastName${number}`]: addBreakfastName,
        [`addBreakfastPrice${number}`]: addBreakfastPrice,
      }
    })

    const addDefaultBreakfastPrice = () => {
      const length = addBreakfastFeeArray.length
      const [adultBreakfastName, adultBreakfastPrice] = splitBar(addBreakfastFeeArray[length - 1])
      const [childBreakfastName, childBreakfastPrice] = splitBar(addBreakfastFeeArray[length - 2])
      const [infantBreakfastName, infantBreakfastPrice] = splitBar(addBreakfastFeeArray[length - 3])
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
    _.flow(getOptionCount, numberToArray, eachOption)(addBreakfastFeeArray)
    addDefaultBreakfastPrice()
    return defaultValues
  }
  const makeExtFeeInput = (defaultValues) => {
    const addExtFeeArray = splitSlash(defaultValues.addExtFee)
    const getOptionCount = (addExtArray) => addExtArray.length

    const eachOption = _.each((number) => {
      const [addExtName, addExtPrice] = splitBar(addExtFeeArray[number - 1])
      defaultValues = {
        ...defaultValues,
        [`addExtName${number}`]: addExtName,
        [`addExtPrice${number}`]: addExtPrice,
      }
    })
    _.flow(getOptionCount, numberToArray, eachOption)(addExtFeeArray)
    return defaultValues
  }

  const makeAccommodationOptionInputs = (defaultValues) => {
    const roomOptionArray = splitBar(defaultValues?.options)
    const checkBoxMap = {
      [`조식`]: 'check1',
      [`취사기능`]: 'check2',
      [`풀빌라`]: 'check3',
      [`월풀(자쿠지)`]: 'check4',
      [`화장실2개이상`]: 'check5',
      [`단독(독채)형`]: 'check6',
      [`복층형`]: 'check7',
      [`순수온돌방`]: 'check8',
      [`바베큐`]: 'check9',
      [`수영장`]: 'check10',
      [`인터넷`]: 'check11',
      [`노트북대여`]: 'check12',
      [`픽업유무`]: 'check13',
      [`세미나실`]: 'check14',
      [`노래방`]: 'check15',
      [`애완동물입장가능`]: 'check16',
      [`카페`]: 'check17',
      [`장애인시설`]: 'check18',
      [`통나무숙소`]: 'check19',
      [`산책로`]: 'check20',
      [`골프연습장`]: 'check21',
      [`체험학습장(텃밭)`]: 'check22',
    }
    const eachRoomOption = _.each((roomOption) => {
      const name = checkBoxMap[roomOption]
      defaultValues = { ...defaultValues, [name]: true }
    })
    eachRoomOption(roomOptionArray)
    return defaultValues
  }

  const preprocessDefaultValues = (defaultValues) => {
    //조식추가 나누기
    defaultValues = makeBreakFastFeeInput(defaultValues)
    //기타사항 나누기
    defaultValues = makeExtFeeInput(defaultValues)
    //기타옵션 나누기
    defaultValues = makeAccommodationOptionInputs(defaultValues)

    return defaultValues
  }

  const defaultValues = preprocessDefaultValues(accommodationData)
  const { register, handleSubmit, reset, getValues, watch } = useForm({
    defaultValues: defaultValues,
  })

  useEffect(() => {
    reset({ ...defaultValues })
    setBreakfastOptionCount(splitSlash(accommodationData.addBreakfastFee).length - 3)
    setExtOptionCount(splitSlash(accommodationData.addExtFee).length)
    return () => resetReadAccommodationSelector()
  }, [])

  const onSubmit = _.flow(
    preprocessAccommodationFormData(breakfastOptionCount, extOptionCount),
    addAcNo,
    getFormDataFromJson,
    updateAccommodationSelector,
    updateAccommodationCallback,
    handleResult(navigate)
  )

  return (
    <AccommodationForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
      getValues={getValues}
      formType={'수정'}
      watch={watch}
      acNo={acNo}
    />
  )
}

// const validate = () => {}

const handleResult = (navigate) => async (data) => {
  const { message } = await data
  if (message === '성공') {
    alert('수정되었습니다.')
    navigate(ACCOMMODATION_LIST_URL)
  } else {
    alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
  }
}
