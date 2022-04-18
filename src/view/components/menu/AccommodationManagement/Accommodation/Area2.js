import { readAreaListSelector } from '@state/accommodationManagement/accommodation'
import { useRecoilValue } from 'recoil'

export default function Area2({ register, watch }) {
  const parameter = { level: 3, areaCode: watch('area1') }
  const {
    data: { data: areaList },
  } = useRecoilValue(readAreaListSelector(parameter))
  console.log(areaList)
  return (
    <dl>
      <dt>지역2</dt>
      <dd>
        <select {...register('area2')}>
          <option value={'0'}>지역선택</option>
          {areaList.map((area) => (
            <option key={area.areaCode} value={area.areaCode}>
              {area.areaNameLevel3}
            </option>
          ))}
        </select>
      </dd>
    </dl>
  )
}
