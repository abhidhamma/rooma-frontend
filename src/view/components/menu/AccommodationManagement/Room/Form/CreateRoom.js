import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import { createRoomSelector } from '@state/accommodationManagement/room'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { validateRoomForm } from '@util/validation/validateRoomForm'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import RoomForm from './Form'

export default function CreateRoom() {
  const createRoomCallback = useCreateAccommodationCallback('create Room')
  let navigate = useNavigate()
  const defaultValues = {
    cpNo: '1',
    acNo: 'unSelected',
    rtNo: '1',
    saleStartdate: '선택해주세요',
    saleEnddate: '선택해주세요',
    name: '101호',
    useYn: 'Y',
    description: '',
  }
  const { register, handleSubmit, watch, reset } = useForm({ defaultValues })
  const onSubmit = _.flow(
    validateRoomForm,
    getFormDataFromJson,
    createRoom(createRoomCallback, navigate)
  )
  return (
    <RoomForm
      formType={'등록'}
      titleText={'객실등록'}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      watch={watch}
      reset={reset}
    />
  )
}
const createRoom = (createRoomCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }

  createRoomCallback(createRoomSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('등록되었습니다.')
      navigate('/accommodationManagement/room')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
