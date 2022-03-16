import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import {
  readAccommodationSelector,
  updateAccommodationSelector,
} from '@state/accommodation/accommodation'
import AccommodationForm from './Form'
import { preprocessAccommodationFormdata } from './CreateAccommodation'

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

  const split = _.split('|')
  const makeAccommodationOptionInputs = (defaultValues) => {
    const roomOptionArray = split(defaultValues?.options)
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
    defaultValues = makeAccommodationOptionInputs(defaultValues)
    return defaultValues
  }

  const defaultValues = preprocessDefaultValues(accommodationData)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  })

  useEffect(() => {
    reset({ ...defaultValues })
    return () => resetReadAccommodationSelector()
  }, [])

  const onSubmit = _.flow(
    preprocessAccommodationFormdata,
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
      submitText={'수정'}
    />
  )
}

// const validate = () => {}

const handleResult = (navigate) => async (data) => {
  const { message } = await data
  if (message === '성공') {
    alert('수정되었습니다.')
    navigate('/accommodationManagement/accommodation')
  } else {
    alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
  }
}
