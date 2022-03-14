import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import { createRoomTypeSelector } from '@state/accommodation/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { numberToArray } from '@util/common/lodash'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import RoomTypeForm from './Form'

export default function CreateRoomType() {
  const createRoomTypeCallback = useCreateAccommodationCallback('create RoomType')
  let navigate = useNavigate()
  const defaultValues = {
    //객실설정
    roomTotalNum: 0,
    prefix: '디럭스',
    roomNumber: '101',
    suffix: '호',

    //인풋이 있는값
    useYn: 'Y',
    acNo: '1',
    roomTypeName: '디럭스룸',
    roomNames: '',
    saleStartdate: '2022-03-02',
    saleEnddate: '2022-03-03',
    roomComposition: '방2개,화장실1개',
    viewType: '바다전망',
    basicPersionNum: '2',
    addPersionConfig: '조식포함',
    maxPersionNum: '4',
    addBreakfastConfigName: '조식',
    addBreakfastConfigPrice: '10000',
    addEtcConfigName: '바베큐',
    addEtcConfigPrice: '30000',
    roomOptions: 'TV|WIFI',
    convInfo: '객실편의시설',
    etcInfo: '특이사항',
    //히든값
    cpNo: '1',
    originPrice: '50000',
    salePrice: '40000',
    providerPrice: '30000',
    roomTypeCd: '',
    roomMakeConfig: '',
    roomShortDesc: '',
  }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  // const onSubmit = _.flow(preprocessData)
  const onSubmit = _.flow(
    preprocessData,
    getFormDataFromJson,
    createRoomType(createRoomTypeCallback, navigate)
  )
  return (
    <RoomTypeForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitText={'등록'}
      titleText={'객실타입등록'}
      watch={watch}
      reset={reset}
      getValues={getValues}
    />
  )
}
const join = _.join('|')
const makeRoomNames = (submitData) => {
  const { prefix, roomNumber, suffix } = submitData
  const RoomSetting = prefix + '|' + roomNumber + '|' + suffix + '|'
  const getRoomTotalNum = (submitData) => Number(submitData.roomTotalNum)
  const mapRoomName = _.map((number) => submitData[`room${number}`])
  const addRoomSetting = (string) => RoomSetting + string
  return _.flow(getRoomTotalNum, numberToArray, mapRoomName, join, addRoomSetting)(submitData)
}

const makeRoomOptions = (submitData) => {
  const getOptionCount = () => 8
  const filterCkecked = _.filter((number) => submitData[`check${number}`] !== false)
  const mapRoomOption = _.map((number) => submitData[`check${number}`])
  return _.flow(getOptionCount, numberToArray, filterCkecked, mapRoomOption, join)(submitData)
}

export const preprocessData = (submitData) => {
  console.log('preprocessData1')
  console.log(submitData)

  //사용할 변수들
  const { addBreakfastConfigName, addBreakfastConfigPrice, addEtcConfigName, addEtcConfigPrice } =
    submitData

  //객실설정 방번호 합치기
  const roomNames = makeRoomNames(submitData)
  submitData.roomNames = roomNames

  //조식추가 합치기
  submitData.addBreakfastConfig = addBreakfastConfigName + '|' + addBreakfastConfigPrice

  //기타사항 합치기
  submitData.addEtcConfig = addEtcConfigName + '|' + addEtcConfigPrice

  //기타옵션 만들기
  submitData.roomOptions = makeRoomOptions(submitData)

  console.log('preprocessData2')
  console.log(submitData)
  return submitData
}

const createRoomType = (createRoomTypeCallback, navigate) => (formData) => {
  createRoomTypeCallback(createRoomTypeSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('등록되었습니다.')
      navigate('/accommodationManagement/roomType')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
