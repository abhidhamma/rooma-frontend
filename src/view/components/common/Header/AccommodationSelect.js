import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { currentAccommodationAtom } from '@state/common/common'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

export default function AccommodationSelect() {
  const [currentAccommodation, setCurrentAccommodation] = useRecoilState(currentAccommodationAtom)
  const resetAccommodation = useResetRecoilState(currentAccommodationAtom)

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
  console.log('accommodationSelect : ', list)

  useEffect(() => {
    if (currentAccommodation?.name === undefined) {
      setCurrentAccommodation(list[0])
    }
    return () => {
      resetAccommodation()
    }
  }, [])

  const changeCurrentAccommodation = (event) => {
    const acNo = event.target.value
    const findCurrentAccommodation = _.find((accommodation) => accommodation.acNo === Number(acNo))
    setCurrentAccommodation(findCurrentAccommodation(list))
  }

  return (
    <select onChange={changeCurrentAccommodation} value={currentAccommodation?.acNo}>
      {list.map((accommodation) => (
        <option value={accommodation.acNo} key={accommodation.acNo}>
          {accommodation.name}
        </option>
      ))}
    </select>
  )
}
