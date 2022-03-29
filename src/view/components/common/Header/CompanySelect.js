import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { currentAccommodationAtom, currentCompanyAtom } from '@state/common/common'
import { readCompanyByNoSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export default function CompanySelect() {
  console.log('CompanySelect called')
  const setCurrentCompany = useSetRecoilState(currentCompanyAtom)
  const [currentAccommodation, setCurrentAccommodation] = useRecoilState(currentAccommodationAtom)
  const {
    data: { data: company },
  } = useRecoilValue(readCompanyByNoSelector({ cpNo: '1' }))
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
    setCurrentCompany(company)
    // setCurrentAccommodation(list.find((accommodation) => accommodation.acNo === 65))
    setCurrentAccommodation(list[0])
  }, [])
  console.log(currentAccommodation)

  const changeCurrentAccommodation = (event) => {
    const acNo = event.target.value
    const findCurrentAccommodation = _.find((accommodation) => accommodation.acNo === Number(acNo))
    setCurrentAccommodation(findCurrentAccommodation(list))
  }

  return (
    <select onChange={changeCurrentAccommodation}>
      {list.map((accommodation) => (
        <option value={accommodation.acNo} key={accommodation.acNo}>
          {accommodation.name}
        </option>
      ))}
    </select>
  )
}
