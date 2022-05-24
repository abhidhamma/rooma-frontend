import { COMPANY_LIST_URL, CREATE_COMPANY_URL } from '@constant/locationURLs'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { signUpSelector } from '@state/auth'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CompanyForm from './Form'

export default function CreateCompany() {
  const { register, handleSubmit, reset, getValues } = useForm()
  let navigate = useNavigate()
  const signUpCallback = useApiCallback('Sign Up')

  const onSubmit = _.flow(validation, getFormDataFromJson, signUp(signUpCallback, navigate))

  return (
    <CompanyForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
      getValues={getValues}
      isCreate={true}
    />
  )
}
const validation = (submitData) => {
  const { cpId, name, ownerName, email, hp, zipCode, address1, address2, cpPw, confirmCpPw } =
    submitData

  //해야될것 비밀번호 제외 5가지다
  //아이디, 업체명, 대표명, 휴대폰번호, 주소(, 비밀번호)
  //새로 찾은것 email

  if (cpId === '') {
    alert('업체아이디를 입력해주세요.')
    return false
  }

  if (name === '') {
    alert('업체명을 입력해주세요.')
    return false
  }

  if (ownerName === '') {
    alert('대표명을 입력해주세요.')
    return false
  }

  if (email === '') {
    alert('이메일을 입력해주세요.')
    return false
  }

  if (hp === '') {
    alert('휴대폰번호를 입력해주세요.')
    return false
  }

  if (zipCode === '') {
    alert('우편번호 검색버튼으로 우편번호를 입력해주세요.')
    return false
  }

  if (address1 === '') {
    alert('우편번호 검색버튼으로 주소를 입력해주세요.')
    return false
  }

  if (address2 === '') {
    alert('상세주소를 입력해주세요.')
    return false
  }

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
const signUp = (signUpCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }

  signUpCallback(signUpSelector(formData)).then((data) => {
    if (data.status === 'OK') {
      alert('등록되었습니다.')
      navigate(COMPANY_LIST_URL)
    } else {
      alert(data.message)
    }
  })
}
