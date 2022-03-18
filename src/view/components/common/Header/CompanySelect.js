import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { currentAccommodationAtom, currentCompanyAtom } from '@state/common/common'
import { readCompanyByNoSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function CompanySelect() {
  const setCurrentCompany = useSetRecoilState(currentCompanyAtom)
  const setCurrentAccommodation = useSetRecoilState(currentAccommodationAtom)
  const {
    data: { data: company },
  } = useRecoilValue(readCompanyByNoSelector({ cpNo: '1' }))

  const data = {
    cpNo: '1',
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
    setCurrentAccommodation(list[0])
  })

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
