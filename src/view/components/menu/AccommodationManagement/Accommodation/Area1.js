import { readAreaListSelector } from '@state/accommodationManagement/accommodation'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

export default function Area1({ register, watch, reset, getValues }) {
  const parameter = { level: 2, areaCode: '' }
  const {
    data: { data: areaList },
  } = useRecoilValue(readAreaListSelector(parameter))
  return (
    <dl>
      <dt>지역1</dt>
      <dd>
        <select {...register('area1')}>
          <option value={'0'}>지역선택</option>
          {areaList.map((area) => (
            <option key={area.areaCode} value={area.areaCode}>
              {area.areaNameLevel2}
            </option>
          ))}
        </select>
      </dd>
    </dl>
  )
}
