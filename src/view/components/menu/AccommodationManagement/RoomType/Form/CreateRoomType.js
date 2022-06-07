import { ROOMTYPE_LIST_URL } from '@constant/locationURLs'
import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import { readAccommodationSelector } from '@state/accommodationManagement/accommodation'
import {
  breakfastConfigOptionCountAtom,
  createRoomTypeSelector,
  etcConfigOptionCountAtom,
} from '@state/accommodationManagement/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyyyMMddWithHyphen } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { numberToArray } from '@util/common/lodash'
import { validateRoomTypeForm } from '@util/validation/validateRoomTypeForm'
import { addDays } from 'date-fns'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import RoomTypeForm from './Form'

export default function CreateRoomType() {
  const createRoomTypeCallback = useCreateAccommodationCallback('create RoomType')
  const breakfastConfigOptionCount = useRecoilValue(breakfastConfigOptionCountAtom)
  const etcConfigOptionCount = useRecoilValue(etcConfigOptionCountAtom)

  const today = new Date()
  const defaultSaleStartdate = formatyyyyMMddWithHyphen(today)
  const defaultSaleEnddate = formatyyyyMMddWithHyphen(addDays(today, 1))

  let navigate = useNavigate()
  // const defaultValues = {
  //   //객실설정
  //   roomTotalNum: 0,
  //   prefix: '디럭스',
  //   roomNumber: '101',
  //   suffix: '호',

  //   //인풋이 있는값
  //   useYn: 'Y',
  //   roomTypeName: '디럭스룸',
  //   roomNames: '',
  //   saleStartdate: '2022-03-02',
  //   saleEnddate: '2022-03-03',
  //   roomComposition: '방2개,화장실1개',
  //   viewType: '바다전망',
  //   basicPersionNum: '2',
  //   addPersionConfig: '조식포함',
  //   maxPersionNum: '4',
  //   addBreakfastConfigName: '조식',
  //   addBreakfastConfigPrice: '10000',
  //   addEtcConfigName: '바베큐',
  //   addEtcConfigPrice: '30000',
  //   roomOptions: 'TV|WIFI',
  //   convInfo: '객실편의시설',
  //   etcInfo: '특이사항',
  //   adultBreakfastName: '성인',
  //   childBreakfastName: '소아',
  //   infantBreakfastName: '유아',
  //   //히든값
  //   cpNo: '1',
  //   originPrice: '50000',
  //   salePrice: '40000',
  //   providerPrice: '30000',
  //   roomTypeCd: '',
  //   roomMakeConfig: '',
  //   roomShortDesc: '',
  // }

  const user = loadItem('user')
  const defaultValues = {
    //객실설정
    roomTotalNum: 0,
    prefix: '디럭스',
    roomNumber: '101',
    suffix: '호',

    //인풋이 있는값
    useYn: 'Y',
    roomTypeName: '',
    roomNames: '',
    saleStartdate: defaultSaleStartdate,
    saleEnddate: '',
    roomComposition: '',
    viewType: '바다전망',
    basicPersionNum: '2',
    addPersionConfig: '',
    maxPersionNum: '4',
    addBreakfastConfigName: '조식',
    addBreakfastConfigPrice: '10000',
    addEtcConfigName: '바베큐',
    addEtcConfigPrice: '30000',
    roomOptions: 'TV|WIFI',
    convInfo: '',
    etcInfo: '',
    adultBreakfastName: '성인',
    childBreakfastName: '소아',
    infantBreakfastName: '유아',
    //히든값
    cpNo: user.cpNo,
    originPrice: '50000',
    salePrice: '40000',
    providerPrice: '30000',
    roomTypeCd: '',
    roomMakeConfig: '',
    roomShortDesc: '',
  }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  //셀렉트박스에서 acNo가 바뀌었을때 cpNo를 가져와 바꿔준다
  const {
    data: { data: accommodationData },
  } = useRecoilValue(readAccommodationSelector({ acNo: watch('acNo') }))
  const resetReadAccommodationSelector = useRecoilRefresher_UNSTABLE(
    readAccommodationSelector({ acNo: watch('acNo') })
  )
  useEffect(() => {
    resetReadAccommodationSelector()
    reset({ ...getValues(), cpNo: accommodationData?.cpNo })
  }, [watch('acNo')])

  const onSubmit = _.flow(
    validateRoomTypeForm,
    preprocessRoomTypeFormData(breakfastConfigOptionCount, etcConfigOptionCount),
    getFormDataFromJson,
    createRoomType(createRoomTypeCallback, navigate)
  )
  return (
    <RoomTypeForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      formType={'등록'}
      titleText={'객실타입등록'}
      watch={watch}
      reset={reset}
      getValues={getValues}
    />
  )
}
const joinComma = _.join(',')
const joinBar = _.join('||')
const joinSlash = _.join('//')
const makeRoomNames = (submitData) => {
  const getRoomTotalNum = (submitData) => Number(submitData.roomTotalNum)
  const mapRoomName = _.map((number) => submitData[`room${number}`])
  return _.flow(getRoomTotalNum, numberToArray, mapRoomName, joinComma)(submitData)
}

const makeBreakfastConfig = (submitData, breakfastConfigOptionCount) => {
  const getOptionCount = () => Number(breakfastConfigOptionCount)
  const mapPair = _.map((number) => {
    const addBreakfastConfigName = submitData[`addBreakfastConfigName${number}`]
    const addBreakfastConfigPrice = submitData[`addBreakfastConfigPrice${number}`]
    return `${addBreakfastConfigName}||${addBreakfastConfigPrice}`
  })
  const addDefaultBreakfastPrice = (optionBreakfastString) => {
    const adultBreakfastName = submitData['adultBreakfastName']
    const adultBreakfastPrice = submitData['adultBreakfastPrice']
    const childBreakfastName = submitData['childBreakfastName']
    const childBreakfastPrice = submitData['childBreakfastPrice']
    const infantBreakfastName = submitData['infantBreakfastName']
    const infantBreakfastPrice = submitData['infantBreakfastPrice']
    const defaultBreakfastString = joinSlash([
      adultBreakfastName + '||' + adultBreakfastPrice,

      childBreakfastName + '||' + childBreakfastPrice,

      infantBreakfastName + '||' + infantBreakfastPrice,
    ])
    return joinSlash([optionBreakfastString, defaultBreakfastString])
  }
  return _.flow(
    getOptionCount,
    numberToArray,
    mapPair,
    joinSlash,
    addDefaultBreakfastPrice
  )(submitData)
}
const makeEtcConfig = (submitData, etcConfigOptionCount) => {
  const getOptionCount = () => Number(etcConfigOptionCount)
  const mapPair = _.map((number) => {
    const addEtcConfigName = submitData[`addEtcConfigName${number}`]
    const addEtcConfigPrice = submitData[`addEtcConfigPrice${number}`]
    return `${addEtcConfigName}||${addEtcConfigPrice}`
  })
  return _.flow(getOptionCount, numberToArray, mapPair, joinSlash)(submitData)
}

const makeRoomOptions = (submitData) => {
  const getOptionCount = () => 8
  const filterChecked = _.filter((number) => submitData[`check${number}`] !== false)
  const checkBoxMap = {
    check1: '조식',
    check2: '취사기능',
    check3: '풀빌라',
    check4: '월풀(자쿠지)',
    check5: '화장실2개이상',
    check6: '단독(독채)형',
    check7: '복층형',
    check8: '순수온돌방',
  }
  const mapRoomOption = _.map((number) => checkBoxMap[`check${number}`])
  return _.flow(getOptionCount, numberToArray, filterChecked, mapRoomOption, joinBar)(submitData)
}

export const preprocessRoomTypeFormData =
  (breakfastConfigOptionCount, etcConfigOptionCount) => (submitData) => {
    if (submitData === false) {
      return false
    }
    const { prefix, roomNumber, suffix } = submitData
    //객실설정 방번호 합치기
    submitData.roomMakeConfig = prefix + '||' + roomNumber + '||' + suffix
    submitData.roomNames = makeRoomNames(submitData)

    //조식추가 합치기
    submitData.addBreakfastConfig = makeBreakfastConfig(submitData, breakfastConfigOptionCount)

    //기타사항 합치기
    submitData.addEtcConfig = makeEtcConfig(submitData, etcConfigOptionCount)

    //기타옵션 만들기
    submitData.roomOptions = makeRoomOptions(submitData)

    console.log(submitData)
    return submitData
  }

const createRoomType = (createRoomTypeCallback, navigate) => (formData) => {
  if (formData === false) {
    return false
  }
  createRoomTypeCallback(createRoomTypeSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('등록되었습니다.')
      navigate(ROOMTYPE_LIST_URL)
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}

const validation = () => {}
