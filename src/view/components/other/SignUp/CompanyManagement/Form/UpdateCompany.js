import { COMPANY_LIST_URL } from '@constant/locationURLs'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { readCompanyByNoSelector, updateCompanySelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import CompanyForm from './Form'

export default function UpdateCompany() {
  const updateCompanyCallback = useApiCallback('updateCompany')

  let navigate = useNavigate()
  let { companyId } = useParams()
  const cpNo = companyId
  const parameter = {
    cpNo,
  }
  const result = useRecoilValue(readCompanyByNoSelector(parameter))
  const company = result?.data?.data
  console.log(company)

  const defaultValues = { ...company, cpPw: undefined }
  const { register, handleSubmit } = useForm({ defaultValues })
  const onSubmit = _.flow(
    validation,
    getFormDataFromJson,
    updateCompany(updateCompanyCallback, navigate)
  )
  return (
    <CompanyForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isCreate={false}
    />
  )
}
const validation = (submitData) => {
  const { cpPw, confirmCpPw } = submitData

  if (cpPw === '') {
    alert('비밀번호를 입력해주세요.')
    return false
  }

  if (confirmCpPw === '') {
    alert('비밀번호확인을 입력해주세요.')
    return false
  }

  if (cpPw !== confirmCpPw) {
    alert('비밀번호와 비밀번호확인이 다릅니다')
    return false
  }
  return submitData
}
const updateCompany = (updateCompanyCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }
  updateCompanyCallback(updateCompanySelector(formData)).then((result) => {
    const { message } = result
    if (message === '성공') {
      alert('수정되었습니다')
      navigate(COMPANY_LIST_URL)
    }
  })
}
