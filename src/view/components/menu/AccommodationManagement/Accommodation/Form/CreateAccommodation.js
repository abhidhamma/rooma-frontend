import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import {
  breakfastOptionCountAtom,
  createAccommodationSelector,
  extOptionCountAtom,
  readAccommodationListSelector,
} from '@state/accommodationManagement/accommodation'
import AccommodationForm from './Form'
import { validateAccommodationInput } from '@util/validation/validateAccommodationInput'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { currentCompanyAtom } from '@state/common/common'
import { numberToArray } from '@util/common/lodash'
import { ACCOMMODATION_LIST_URL } from '@constant/locationURLs'
import { loadItem } from '@util/common/localStorage'

export default function CreateAccommodation() {
  const createAccommodationCallback = useCreateAccommodationCallback('create Accommodation')
  const breakfastOptionCount = useRecoilValue(breakfastOptionCountAtom)
  const extOptionCount = useRecoilValue(extOptionCountAtom)
  const { name, cpNo } = useRecoilValue(currentCompanyAtom)

  const user = loadItem('user')
  const readAccommodationListParameter = {
    cpNo: user?.cpNo,
    name: '',
    startRow: 0,
    rowCount: 999,
  }
  const resetReadAccommodationList = useRecoilRefresher_UNSTABLE(
    readAccommodationListSelector(getFormDataFromJson(readAccommodationListParameter))
  )

  console.log('currentCompany')
  console.log(name, cpNo)
  let navigate = useNavigate()

  const defaultValues = {
    cpName: name,
    cpNo: user?.cpNo,
    nickname: '롯데호텔',
    homepage: 'www.lottehotel.com',
    email: 'lottel@lotte.com',
    fax: '',
    address2: '1111번지',
    options: '',
    addPersionFee: '성인||20000//유아||10000',
    addBreakfastFee: '성인||20000//유아||10000',
    addBreakfastName: '성인',
    addBreakfastPrice: '20000',
    addExtFee: '바베큐||30000//고기||10000//숯||10000',
    addExtName: '바베큐',
    addExtPrice: '30000',
    useYn: 'Y',
    openYn: 'Y',
    name: '롯데호텔',
    tel: '070-1111-2222',
    address1: '제주도 서귀포시 중문',
    positionX: '1111',
    positionY: '2222',
    bankAccount: '하나은행 1111-2222',
    saleStartdate: '2022-03-02',
    saleEnddate: '2022-03-01',
    area1: '0',
    area2: '0',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    shortDesc: '범섬이 한눈에 보이는 최고의 뷰! 편안한 객실!',
    description: '안내',
    notice: '유의사항',
    adultBreakfastName: '성인',
    childBreakfastName: '소아',
    infantBreakfastName: '유아',
  }
  const { register, handleSubmit, reset, getValues, watch } = useForm({ defaultValues })

  const onSubmit = _.flow(
    validateAccommodationInput,
    preprocessAccommodationFormData(breakfastOptionCount, extOptionCount),
    getFormDataFromJson,
    createAccommodation(createAccommodationCallback, navigate, resetReadAccommodationList)
  )

  return (
    <AccommodationForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
      getValues={getValues}
      formType={'등록'}
      watch={watch}
    />
  )
}

const createAccommodation =
  (createAccommodationCallback, navigate, resetReadAccommodationList) => (formData) => {
    if (formData === false) {
      return
    }

    createAccommodationCallback(createAccommodationSelector(formData)).then((data) => {
      const { message } = data
      if (message === '성공') {
        alert('등록되었습니다.')
        navigate(ACCOMMODATION_LIST_URL)
        resetReadAccommodationList()
      } else {
        alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
      }
    })
  }
const joinBar = _.join('||')
const joinSlash = _.join('//')
const makeAccommodationFormOptions = (submitData) => {
  const getOptionCount = () => 22
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
    check9: '바베큐',
    check10: '수영장',
    check11: '인터넷',
    check12: '노트북대여',
    check13: '픽업유부',
    check14: '세미나실',
    check15: '노래방',
    check16: '애완동물입장가능',
    check17: '카페',
    check18: '장애인시설',
    check19: '통나무숙소',
    check20: '산책로',
    check21: '골프연습장',
    check22: '체험학습장(텃밭)',
  }
  const mapRoomOption = _.map((number) => checkBoxMap[`check${number}`])
  return _.flow(getOptionCount, numberToArray, filterChecked, mapRoomOption, joinBar)(submitData)
}

const makeBreakfastFee = (submitData, breakfastOptionCount) => {
  const getOptionCount = () => Number(breakfastOptionCount)
  const mapPair = _.map((number) => {
    const addBreakfastName = submitData[`addBreakfastName${number}`]
    const addBreakfastPrice = submitData[`addBreakfastPrice${number}`]
    return `${addBreakfastName}||${addBreakfastPrice}`
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
const makeExtFee = (submitData, extOptionCount) => {
  const getOptionCount = () => Number(extOptionCount)
  const mapPair = _.map((number) => {
    const addExtName = submitData[`addExtName${number}`]
    const addExtPrice = submitData[`addExtPrice${number}`]
    return `${addExtName}||${addExtPrice}`
  })
  return _.flow(getOptionCount, numberToArray, mapPair, joinSlash)(submitData)
}
export const preprocessAccommodationFormData =
  (breakfastOptionCount, extOptionCount) => (submitData) => {
    console.log(submitData)
    if (submitData === false) {
      return false
    }
    //기타옵션 합치기
    submitData.options = makeAccommodationFormOptions(submitData)

    //조식추가 합치기
    submitData.addBreakfastFee = makeBreakfastFee(submitData, breakfastOptionCount)

    //기타사항 합치기
    submitData.addExtFee = makeExtFee(submitData, extOptionCount)

    console.log(submitData)

    return submitData
  }
