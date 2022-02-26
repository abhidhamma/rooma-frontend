import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuthCallback from '../../../service/hook/useAuthCallback'
import { signinSelector } from '../../../service/state/auth'

export default function SignInInput() {
  const signinCallback = useAuthCallback('Sign in')

  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm()

  const onSubmit = (signinData) => {
    if (signinData.username === '') {
      alert('아이디를 입력해주세요.')
      return
    }

    if (signinData.password === '') {
      alert('비밀번호를 입력해주세요.')
      return
    }

    signinCallback(signinSelector(signinData)).then((isSuccess) => {
      if (isSuccess) {
        navigate('/reservationScheduler')
      } else {
        alert('아이디와 비밀번호가 일치하지 않습니다.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id='form'>
      <input type='text' placeholder='아이디를 입력해주세요' defaultValue={'sa'} {...register('username')} />
      <input type='password' placeholder='비밀번호를 입력해주세요' defaultValue={'12345'} {...register('password')} />
      <button className='btn btn-large' type={'submit'} style={{ background: '#1d2340', border: '1px solid #1d2340', borderRadius: '100px 100px', color: '#fff', width: '98%', marginLeft: '8px' }}>
        로그인
      </button>
    </form>
  )
}
