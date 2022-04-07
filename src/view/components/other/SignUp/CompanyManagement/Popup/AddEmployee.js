import useApiCallback from '@hook/apiHook/useApiCallback'
import { createMemberSelector, readMemberListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE } from 'recoil'

export default function AddEmployee({ setIsShowDimmdLayer, setIsAddEmployeeOpen }) {
  const createMemberCallback = useApiCallback('createMemberCallback')

  let { companyId } = useParams()
  const cpNo = companyId

  const resetReadMemberList = useRecoilRefresher_UNSTABLE(readMemberListSelector({ cpNo }))
  const defaultValues = {
    mbNo: 0,
    name: '홍길동',
    cpNo,
    mbId: 'test111',
    email: 'aaaa@aaaa.com',
    tel: '010-1111-2222',
    grade: 'CE', //고정
    memo: '',
    role: '0',
    mbPasswd: '1234',
  }
  const { register, handleSubmit } = useForm({ defaultValues })

  const validation = (submitData) => {
    if (submitData.role === '0') {
      alert('역할을 선택해주세요.')
      return false
    }
    if (submitData.mbId === '') {
      alert('아이디를 입력해주세요.')
      return false
    }
    if (submitData.mbPasswd === '') {
      alert('비밀번호를 입력해주세요.')
      return false
    }
    if (submitData.tel === '') {
      alert('연락처를 입력해주세요.')
      return false
    }
    //필수 tel, mbId, mbPasswd
    console.log('onsubmit')
    console.log(submitData)
    return submitData
  }
  const onSubmit = _.flow(
    validation,
    getFormDataFromJson,
    createMember(
      createMemberCallback,
      resetReadMemberList,
      setIsShowDimmdLayer,
      setIsAddEmployeeOpen
    )
  )

  const close = () => {
    setIsShowDimmdLayer(false)
    setIsAddEmployeeOpen(false)
  }
  return (
    <div
      id='addEmployeePOP'
      className='popup-box fix w500'
      style={{ display: 'block', left: '31%', top: '20%' }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={'hidden'} {...register('cpNo')} />
        <input type={'hidden'} {...register('mbNo')} />
        <input type={'hidden'} {...register('grade')} />
        <div className='popWrap'>
          <a href='#' className='pop-close layer-close' onClick={close}>
            닫기
          </a>
          <div className='pop-tit'>직원추가</div>
          <div className='pop-cont'>
            {/* <!-- S:레이어 컨텐츠 --> */}
            <div className='writeArea'>
              <section>
                <dl>
                  <dt>아이디</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='아이디 (영문 or 영문+숫자)'
                      {...register('mbId')}
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>비밀번호</dt>
                  <dd>
                    <input type='text' placeholder='비밀번호 입력' {...register('mbPasswd')} />
                  </dd>
                </dl>
                <dl>
                  <dt>담당자명</dt>
                  <dd>
                    <input type='text' placeholder='담당자명 입력' {...register('name')} />
                  </dd>
                </dl>
                <dl>
                  <dt>역할</dt>
                  <dd>
                    <select {...register('role')}>
                      <option value={'0'}>역할선택</option>
                      <option value={'01'}>마스터</option>
                      <option value={'02'}>예약담당직원</option>
                      <option value={'03'}>정산담당직원</option>
                      <option value={'04'}>일반업무직원</option>
                      <option value={'05'}>청소직원</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>연락처</dt>
                  <dd>
                    <input type='text' placeholder='연락처 입력' {...register('tel')} />
                  </dd>
                </dl>
                <dl>
                  <dt>메모</dt>
                  <dd>
                    <textarea placeholder='메모 입력' {...register('memo')}></textarea>
                  </dd>
                </dl>
              </section>
            </div>

            {/* <!-- E:레이어 컨텐츠 --> */}
            <div className='pop-footer'>
              <button
                type='submit'
                style={{
                  display: 'block',
                  background: '#5b73e8',
                  textAlign: 'center',
                  height: '60px',
                  lineHeight: '60px',
                  color: '#fff',
                  fontSize: '20px',
                  width: '100%',
                }}
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const createMember =
  (createMemberCallback, resetReadMemberList, setIsShowDimmdLayer, setIsAddEmployeeOpen) =>
  (formData) => {
    if (formData === false) {
      return
    }
    createMemberCallback(createMemberSelector(formData)).then((result) => {
      const { message } = result

      if (message === '성공') {
        resetReadMemberList()
        setIsShowDimmdLayer(false)
        setIsAddEmployeeOpen(false)
        alert('등록되었습니다.')
      } else {
        alert(message)
      }
    })
  }
