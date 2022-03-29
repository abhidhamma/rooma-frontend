import useApiCallback from '@hook/apiHook/useApiCallback'
import { readCompanyByNoSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import SignUpForm from './SignUpForm'

export default function UpdateUserInfoContainer() {
  const updateCompanyCallback = useApiCallback('updateCompany')
  const user = loadItem('user')
  const parameter = {
    cpNo: user?.cpNo,
  }
  const result = useRecoilValue(readCompanyByNoSelector(parameter))
  const company = result?.data?.data
  console.log(company)
  // const defaultValues = {
  //   cpId: 'test',
  //   name: '제주도펜션',
  //   ownerName: '변경익',
  //   bizNum: '123456778',
  //   bankAccount: '하나은행 111-222-3333',
  //   homepage: 'test.com',
  //   email: 'test@test.com',
  //   tel: '064-1111-2222',
  //   fax: '1111-2222',
  //   hp: '010-0000-2222',
  //   address1: '제주도 서귀포시 서호동',
  //   address2: '유포리아산업단지 B동 000호',
  //   adminMemo: '',
  //   cpPw: '1234',
  //   confirmCpPw: '1234',
  //   zipcode: '11122',
  // }
  const defaultValues = { ...company, cpPw: undefined }
  const { register, handleSubmit } = useForm({ defaultValues })
  const onSubmit = _.flow(validation, getFormDataFromJson, updateCompany(updateCompanyCallback))
  return <SignUpForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
}
const validation = (submitData) => {
  const { cpPw, confirmCpPw } = submitData

  if (cpPw !== confirmCpPw) {
    alert('비밀번호와 비밀번호확인이 다릅니다')
    return false
  }
}
const updateCompany = (updateCompanyCallback) => (formData) => {
  if (formData === false) {
    return
  }
  updateCompanyCallback()
}
