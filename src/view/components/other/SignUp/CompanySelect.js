import { readCompanyListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useRecoilValue } from 'recoil'

export default function CompanySelect({ register }) {
  const readCompanyListParameter = {
    cpNo: '1',
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
