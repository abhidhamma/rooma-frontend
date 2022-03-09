import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { encode } from '@util/common/hash'
import { saveItem } from '@util/common/localStorage'
import useAuthCallback from '@hook/apiHook/useAuthCallback'
import { signInSelector } from '@state/auth'
import { validateSignInInput } from '@util/validation/validateSignInInput'

export default function SignInInput() {
  const signInCallback = useAuthCallback('Sign In')
  const { register, handleSubmit } = useForm()
  let navigate = useNavigate()

  const onSubmit = _.flow(validateSignInInput, signIn(signInCallback, navigate))

  return (
    <form onSubmit={handleSubmit(onSubmit)} id='form'>
      <input
        type='text'
        placeholder='아이디를 입력해주세요'
        defaultValue={'sa'}
        {...register('username')}
      />
      <input
        type='password'
        placeholder='비밀번호를 입력해주세요'
        defaultValue={'12345'}
        {...register('password')}
      />
      <button
        className='btn btn-large'
        type={'submit'}
        style={{
          background: '#1d2340',
          border: '1px solid #1d2340',
          borderRadius: '100px 100px',
          color: '#fff',
          width: '98%',
          marginLeft: '8px',
        }}
      >
        로그인
      </button>
    </form>
  )
}

const signIn = (signInCallback, navigate) => (signInData) => {
  if (signInData === false) {
    return
  }
  signInCallback(signInSelector(signInData)).then((isSuccess) => {
    if (isSuccess) {
      saveItem('PAPAGO_LANG_DETECT', encode(signInData.password))
      navigate('/reservationStatus')
    } else {
      alert('아이디와 비밀번호가 일치하지 않습니다.')
    }
  })
}
