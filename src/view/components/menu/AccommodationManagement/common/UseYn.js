import useUpdateAccommodationCallback from '@hook/apiHook/useUpdateAccommodationCallback'
import { updateAccommodationSelector } from '@state/accommodation/accommodation'
import { updateRoomSelector } from '@state/accommodation/room'
import { updateRoomTypeSelector } from '@state/accommodation/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useState } from 'react'

export default function UseYn({ rowData, type }) {
  const originalUseYn = rowData.useYn
  const [useYn, setUseYn] = useState(originalUseYn)
  const updateUseYnCallback = useUpdateAccommodationCallback('update Accommodation UseYn')

  const handleUseYnSelect = (event) => {
    const changedUseYn = event.target.value
    setUseYn(changedUseYn)
    const jsonData = { ...rowData, useYn: changedUseYn }
    let updateSelector = null

    if (type === 'accommodation') {
      updateSelector = updateAccommodationSelector
    } else if (type === 'roomType') {
      updateSelector = updateRoomTypeSelector
    } else if (type === 'room') {
      updateSelector = updateRoomSelector
    }

    const update = _.flow(getFormDataFromJson, updateSelector, updateUseYnCallback, handleResult)
    return update(jsonData)
  }

  const handleResult = async (data) => {
    const { message } = await data
    if (message === '성공') {
      alert('수정되었습니다.')
    } else {
      setUseYn(originalUseYn)
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  }

  return (
    <select value={useYn} onChange={handleUseYnSelect}>
      <option value={'Y'}>사용</option>
      <option value={'N'}>미사용</option>
    </select>
  )
}
