import { currentCompanyAtom } from '@state/common/common'
import { readCompanyByNoSelector } from '@state/company/company'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function CompanySelect() {
  const setCurrentCompany = useSetRecoilState(currentCompanyAtom)
  const {
    data: { data: company },
  } = useRecoilValue(readCompanyByNoSelector({ cpNo: '1' }))

  useEffect(() => {
    setCurrentCompany(company)
  })

  return (
    <select>
      <option value={'1'}>신라호텔</option>
    </select>
  )
}
