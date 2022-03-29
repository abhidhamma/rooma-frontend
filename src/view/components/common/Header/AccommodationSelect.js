import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function AccommodationSelect() {
  console.log('AccommodationSelect called')
  const [currentAccommodation, setCurrentAccommodation] = useRecoilState(currentAccommodationAtom)

  const user = loadItem('user')

  const data = {
    cpNo: user?.cpNo,
    name: '',
    startRow: 0,
    rowCount: 999,
  }
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(data)))

  useEffect(() => {
    if (currentAccommodation?.name === undefined) {
      console.log('accommodation 초기화')
      setCurrentAccommodation(list[0])
    }
  }, [])
  console.log(currentAccommodation.acNo)

  const changeCurrentAccommodation = (event) => {
    const acNo = event.target.value
    const findCurrentAccommodation = _.find((accommodation) => accommodation.acNo === Number(acNo))
    setCurrentAccommodation(findCurrentAccommodation(list))
  }

  return (
    <select onChange={changeCurrentAccommodation} value={currentAccommodation.acNo}>
      {list.map((accommodation) => (
        <option value={accommodation.acNo} key={accommodation.acNo}>
          {accommodation.name}
        </option>
      ))}
    </select>
  )
}
