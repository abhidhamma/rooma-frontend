import { readCompanyListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import { useRecoilValue } from 'recoil'

export default function CompanyListSelect({ register }) {
  const user = loadItem('user')
  const readCompanyListParameter = {
    cpNo: user.cpNo === 1 ? '0' : user.cpNo,
    name: '',
    startRow: `0`,
    rowCount: `999`,
  }
  const {
    data: {
      data: { list },
    },
  } = useRecoilValue(readCompanyListSelector(getFormDataFromJson(readCompanyListParameter)))
  return (
    <select {...register('cpNo')} defaultValue={'unSelected'}>
      <option value={'unSelected'}>회사명선택</option>
      {list.map((company) => (
        <option key={company.cpNo} value={company.cpNo}>
          {company.name}
        </option>
      ))}
    </select>
  )
}
