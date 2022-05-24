import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function AccommodationSelect({ register }) {
  const user = loadItem('user')

  const data = {
    cpNo: user?.cpNo === 1 ? '0' : user?.cpNo,
    name: '',
    startRow: 0,
    rowCount: 999,
  }
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(data)))

  return (
    <select className='mgr_5' {...register('acNo')}>
      <option value={'0'}>숙소선택(전체)</option>
      {list.map((accommodation) => (
        <option value={accommodation.acNo} key={accommodation.acNo}>
          {accommodation.name}
        </option>
      ))}
    </select>
  )
}
