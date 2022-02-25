import { useForm } from 'react-hook-form'

export default function SignInInput() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log('서브밋작동')
    console.log(data)
  }

  console.log(watch('example'))
  return (
    <form onSubmit={handleSubmit(onSubmit)} id='form'>
      <div className='inputArea'>
        <input type='text' placeholder='아이디를 입력해주세요' defaultValue={'test'} {...register('example')} />
        <input type='password' placeholder='비밀번호를 입력해주세요' defaultValue={'test'} {...register('exampleRequired', { required: true })} />
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
        <button className='btn btn-large' type={'submit'} style={{ background: '#1d2340', border: '1px solid #1d2340', borderRadius: '100px 100px', color: '#fff', width: '98%', marginLeft: '8px' }}>
          로그인
        </button>
      </div>
    </form>
  )
}
