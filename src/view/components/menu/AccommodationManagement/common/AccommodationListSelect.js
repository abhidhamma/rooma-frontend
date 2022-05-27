import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import { useRecoilValue } from 'recoil'

export default function AccommodationListSelect({ register }) {
  const user = loadItem('user')
  const parameter = {
    cpNo: user?.cpNo === 1 ? '0' : user?.cpNo,
    name: '',
    startRow: 0,
    rowCount: 999,
  }
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(parameter)))
  return (
    <select {...register('acNo')} defaultValue={'unSelected'}>
      <option value={'unSelected'}>숙소명선택</option>
      {list.map((accommodation) => (
        <option key={accommodation.acNo} value={accommodation.acNo}>
          {accommodation.name}
        </option>
      ))}
    </select>
  )
}
