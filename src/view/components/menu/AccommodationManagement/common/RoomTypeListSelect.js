import { readRoomTypeListSelector } from '@state/accommodationManagement/roomType'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useRecoilValue } from 'recoil'

export default function RoomTypeListSelect({ register, watch }) {
  console.log('RoomTypeListSelect called...')
  console.log(watch('acNo'))
  let initialParameter = { cpNo: '1', roomTypeName: '', startRow: 0, rowCount: 999 }
  const addAcNo = (acNo) =>
    typeof Number(acNo) === 'number' && typeof acNo !== 'undefined' && acNo !== 'unSelected'
      ? { ...initialParameter, acNo }
      : false
  console.log(typeof acNo)

  const readRoomTypeList = _.flow(watch, addAcNo, getFormDataFromJson, readRoomTypeListSelector)
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readRoomTypeList('acNo'))
  console.log(list)
  return (
    <select {...register('rtNo')}>
      <option value={'unSelected'}>
        {list.length === 0 ? '객실타입이 존재하지 않는 숙소입니다.' : '객실타입명선택'}
      </option>
      {list.map((roomType) => (
        <option key={roomType.rtNo} value={roomType.rtNo}>
          {roomType.roomTypeName}
        </option>
      ))}
    </select>
  )
}
