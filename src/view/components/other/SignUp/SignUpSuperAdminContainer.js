import useApiCallback from '@hook/apiHook/useApiCallback'
import { signUpSelector } from '@state/auth'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { validateSignUpInput } from '@util/validation/validateSignUpInput'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SignUpForm from './SignUpForm'

export default function SignUpSuperAdminContainer() {
  const { register, handleSubmit } = useForm()
  let navigate = useNavigate()
  const signUpCallback = useApiCallback('Sign Up')

  const onSubmit = _.flow(
    validateSignUpInput,
    getFormDataFromJson,
    signUp(signUpCallback, navigate)
  )
  return <SignUpForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
}
const signUp = (signUpCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }

  signUpCallback(signUpSelector(formData)).then((data) => {
    if (data.status === 'OK') {
      alert('등록되었습니다.')
      navigate('/')
    } else {
      alert(data.message)
    }
  })
}
