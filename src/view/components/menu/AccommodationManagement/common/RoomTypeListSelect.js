import { readRoomTypeListSelector } from '@state/accommodation/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useRecoilValue } from 'recoil'

export default function RoomTypeListSelect({ register }) {
  const parameter = { cpNo: '1', roomTypeName: '', startRow: 0, rowCount: 999 }
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readRoomTypeListSelector(getFormDataFromJson(parameter)))
  return (
    <select {...register('rtNo')}>
      <option value={'unSelected'}>객실타입명선택</option>
      {list.map((roomType) => (
        <option key={roomType.rtNo} value={roomType.rtNo}>
          {roomType.roomTypeName}
        </option>
      ))}
    </select>
  )
}
