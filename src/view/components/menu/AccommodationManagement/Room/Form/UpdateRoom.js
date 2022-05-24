import { ROOM_LIST_URL } from '@constant/locationURLs'
import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import {
  readRoomListSelector,
  readRoomSelector,
  updateRoomSelector,
} from '@state/accommodationManagement/room'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
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
  const resetReadRoomSelector = useRecoilRefresher_UNSTABLE(readRoomSelector({ rmNo }))

  useEffect(() => {
    return () => resetReadRoomSelector()
  }, [])
  const defaultValues = roomData
  console.log(defaultValues)
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })

  const user = loadItem('user')
  const data = {
    cpNo: user.cpNo,
    name: '',
    startRow: '0',
    rowCount: '999',
    rtNo: watch('rtNo'),
  }
  const resetReadRoomListSelector = useRecoilRefresher_UNSTABLE(
    readRoomListSelector(getFormDataFromJson(data))
  )
  const onSubmit = _.flow(
    addRmNo,
    getFormDataFromJson,
    updateRoom(updateRoomCallback, navigate, resetReadRoomListSelector)
  )
  return (
    <RoomForm
      formType={'수정'}
      titleText={'객실수정'}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      watch={watch}
      reset={reset}
      getValues={getValues}
    />
  )
}
const updateRoom = (updateRoomCallback, navigate, resetReadRoomListSelector) => (formData) => {
  updateRoomCallback(updateRoomSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('수정되었습니다.')
      navigate(ROOM_LIST_URL)
      resetReadRoomListSelector()
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
