import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import { readRoomSelector, updateRoomSelector } from '@state/accommodation/room'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import RoomForm from './Form'

export default function UpdateRoom() {
  //path variable받아오기
  let { roomId } = useParams()
  const rmNo = roomId
  const addRmNo = (data) => ({ ...data, rmNo })

  const updateRoomCallback = useUpdateAccommodationCallback('update Room')
  let navigate = useNavigate()

  const {
    data: { data: roomData },
  } = useRecoilValue(readRoomSelector({ rmNo }))
  const resetReadRoomTypeSelector = useRecoilRefresher_UNSTABLE(readRoomSelector({ rmNo }))

  useEffect(() => {
    return () => resetReadRoomTypeSelector()
  })
  const defaultValues = roomData
  const { register, handleSubmit } = useForm({ defaultValues })
  const onSubmit = _.flow(addRmNo, getFormDataFromJson, updateRoom(updateRoomCallback, navigate))
  return (
    <RoomForm
      submitText={'수정'}
      titleText={'객실수정'}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  )
}
const updateRoom = (updateRoomCallback, navigate) => (formData) => {
  updateRoomCallback(updateRoomSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('수정되었습니다.')
      navigate('/accommodationManagement/room')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
