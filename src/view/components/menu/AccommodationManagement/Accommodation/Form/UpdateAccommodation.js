import _ from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useReadAccommodationCallback from '@hook/apiHook/useReadAccommodationCallback'
import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import {
  readAccommodationSelector,
  updateAccommodationSelector,
} from '@state/accommodation/accommodation'
import { defaultValuesAtom } from '@state/common/form'
import AccommodationForm from './Form'

export default function UpdateAccommodation() {
  const updateAccommodationCallback = useUpdateAccommodationCallback('update Accommodation')
  const readAccommodationCallback = useReadAccommodationCallback('read Accommodation')
  let navigate = useNavigate()

  const defaultValues = useRecoilValue(defaultValuesAtom)

  useEffect(() => {
    readAccommodationCallback(readAccommodationSelector({ acNo }))
  }, [])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  console.log('defaultValues')
  console.log(defaultValues)

  //path variable받아오기
  let { accommodationId } = useParams()
  const acNo = accommodationId
  const addAcNo = (data) => ({ ...data, acNo })

  const { register, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  })

  const onSubmit = _.flow(
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
    navigate('/accommodationManagement')
  } else {
    alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
  }
}
