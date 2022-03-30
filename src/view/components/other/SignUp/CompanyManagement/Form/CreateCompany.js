import useApiCallback from '@hook/apiHook/useApiCallback'
import { signUpSelector } from '@state/auth'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { validateSignUpInput } from '@util/validation/validateSignUpInput'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CompanyForm from './Form'

export default function CreateCompany() {
  const { register, handleSubmit } = useForm()
  let navigate = useNavigate()
  const signUpCallback = useApiCallback('Sign Up')

  const onSubmit = _.flow(validation, getFormDataFromJson, signUp(signUpCallback, navigate))
  return (
    <CompanyForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isCreate={true}
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
const signUp = (signUpCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }

  signUpCallback(signUpSelector(formData)).then((data) => {
    if (data.status === 'OK') {
      alert('등록되었습니다.')
      navigate('/signUp')
    } else {
      alert(data.message)
    }
  })
}
