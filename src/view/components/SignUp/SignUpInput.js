import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useApiCallback from '@hook/apiHook/useApiCallback'
import { signUpSelector } from '@state/auth'
import { validateSignUpInput } from '@util/validation/validateSignUpInput'

export default function SignUpInput() {
  const { register, handleSubmit } = useForm()
  let navigate = useNavigate()
  const signUpCallback = useApiCallback('Sign Up')

  const onSubmit = _.flow(
    validateSignUpInput,
    getFormDataFromJson,
    signUp(signUpCallback, navigate)
  )
  const cancelSignUp = () => navigate('/')
  return (
    <div className='content'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='titWrap'>
          <h3>회원가입</h3>
        </div>
        <div className='writeArea'>
          <section>
            <div className='two'>
              <dl>
                <dt>업체아이디</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'업체아이디를 입력해주세요'}
                    defaultValue={'test'}
                    {...register('cpId')}
                  />
                </dd>
              </dl>
              <dl>
                <dt>업체명</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'업체명을 입력해주세요'}
                    defaultValue={'제주도펜션'}
                    {...register('name')}
                  />
                </dd>
              </dl>
            </div>
            <div className='two'>
              <dl>
                <dt>대표명</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'대표명을 입력해주세요'}
                    defaultValue={'변경익'}
                    {...register('ownerName')}
                  />
                </dd>
              </dl>
              <dl>
                <dt>사업자등록번호</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'사업자등록번호를 입력해주세요'}
                    defaultValue={'123456778'}
                    {...register('bizNum')}
                  />
                </dd>
              </dl>
            </div>
            <div className='two'>
              <dl>
                <dt>계좌번호</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'계좌번호를 입력해주세요'}
                    defaultValue={'하나은행 111-222-3333'}
                    {...register('bankAccount')}
                  />
                </dd>
              </dl>
              <dl>
                <dt>홈페이지</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'홈페이지를 입력해주세요'}
                    defaultValue={'test.com'}
                    {...register('homepage')}
                  />
                </dd>
              </dl>
            </div>
            <div className='two'>
              <dl>
                <dt>E-mail</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'E-mail을 입력해주세요'}
                    defaultValue={'test@test.com'}
                    {...register('email')}
                  />
                </dd>
              </dl>
              <dl>
                <dt>전화번호</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'전화번호를 입력해주세요'}
                    defaultValue={'064-1111-2222'}
                    {...register('tel')}
                  />
                </dd>
              </dl>
            </div>
            <div className='two'>
              <dl>
                <dt>팩스</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'팩스를 입력해주세요'}
                    defaultValue={'1111-2222'}
                    {...register('fax')}
                  />
                </dd>
              </dl>
              <dl>
                <dt>휴대폰번호</dt>
                <dd>
                  <input
                    type='text'
                    placeholder={'휴대폰번호를 입력해주세요'}
                    defaultValue={'010-0000-2222'}
                    {...register('hp')}
                  />
                </dd>
              </dl>
            </div>
            <dl className='addr'>
              <dt>사업자주소</dt>
              <dd>
                <p>
                  <input type='text' defaultValue={'11122'} {...register('zipcode')} />
                  <button type='button'>우편번호검색</button>
                </p>
                <p>
                  <input
                    type='text'
                    defaultValue={'제주도 서귀포시 서호동'}
                    {...register('address1')}
                  />
                </p>
                <p>
                  <input
                    type='text'
                    defaultValue={'유포리아산업단지 B동 000호'}
                    placeholder={'상세주소를 입력해주세요'}
                    {...register('address2')}
                  />
                </p>
              </dd>
            </dl>
            <dl className='addr'>
              <dt>관리자메모</dt>
              <dd>
                <textarea
                  placeholder={'관리자메모를 입력해주세요'}
                  {...register('adminMemo')}
                ></textarea>
              </dd>
            </dl>
            <div className='two'>
              <dl>
                <dt>비밀번호</dt>
                <dd>
                  <input
                    type='password'
                    defaultValue={'1234'}
                    placeholder={'비밀번호를 입력해주세요'}
                    {...register('cpPw')}
                  />
                </dd>
              </dl>
              <dl>
                <dt>비밀번호확인</dt>
                <dd>
                  <input
                    type='password'
                    defaultValue={'1234'}
                    placeholder={'비밀번호확인을 입력해주세요'}
                    {...register('confirmCpPw')}
                  />
                </dd>
              </dl>
            </div>
          </section>
          {/* <AddEmployee register={register} /> */}
        </div>
        <div className='center mgt_30'>
          <button type='submit' className='btn btn-large purple'>
            등록
          </button>
          <button type='button' className='btn btn-large line1' onClick={cancelSignUp}>
            취소
          </button>
        </div>
        <input type={'text'} {...register('group')} style={{ display: 'none' }} />
      </form>
    </div>
  )
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
