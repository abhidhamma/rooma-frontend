import _ from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { getFormDataFromJson } from '../../../../other/util/common/axiosUtil'
import useReadAccommodationCallback from '../../../../service/hook/useReadAccommodationCallback'
import useUpdateAccommodationCallback from '../../../../service/hook/useUpdateAccommodationCallback'
import { readAccommodationSelector, updateAccommodationSelector } from '../../../../service/state/accommodation'
import { defaultValuesAtom } from '../../../../service/state/common/form'
import AccommodationForm from './Form'

export default function UpdateAccommodation() {
  const updateAccommodationCallback = useUpdateAccommodationCallback('update Accommodation')
  const readAccommodationCallback = useReadAccommodationCallback('read Accommodation')

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

  const onSubmit = _.flow(addAcNo, getFormDataFromJson, updateAccommodationSelector, updateAccommodationCallback)

  return <AccommodationForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
}
