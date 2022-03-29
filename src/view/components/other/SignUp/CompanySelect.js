import { readCompanyListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import { useRecoilValue } from 'recoil'

export default function CompanySelect({ register }) {
  const user = loadItem('user')
  const readCompanyListParameter = {
    cpNo: user?.cpNo,
    name: '',
    startRow: '0',
    rowCount: '999',
  }
  const {
    data: {
      data: { list: companyList },
    },
  } = useRecoilValue(readCompanyListSelector(getFormDataFromJson(readCompanyListParameter)))
  console.log(companyList)
  return (
    <select {...register('name')}>
      {companyList.map((company) => (
        <option value={company.name}>{company.name}</option>
      ))}
    </select>
  )
}
