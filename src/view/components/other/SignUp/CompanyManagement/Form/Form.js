import { COMPANY_LIST_URL } from '@constant/locationURLs'
import { useNavigate } from 'react-router-dom'

export default function CompanyForm({ onSubmit, handleSubmit, register, isCreate }) {
  let navigate = useNavigate()

  const cancel = () => navigate(COMPANY_LIST_URL)
  return (
    <div id='container'>
      <div className='content'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='titWrap'>
            <h3>{isCreate ? '업체등록' : '업체수정'}</h3>
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
                      {...register('cpId')}
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>업체명</dt>
                  <dd>
                    {/* <Suspense
                      fallback={
                        <select>
                          <option></option>
                        </select>
                      }
                    >
                      <CompanySelect register={register} />
                    </Suspense> */}
                    <input
                      type='text'
                      placeholder={'업체명을 입력해주세요'}
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
                      {...register('tel')}
                    />
                  </dd>
                </dl>
              </div>
              <div className='two'>
                <dl>
                  <dt>팩스</dt>
                  <dd>
                    <input type='text' placeholder={'팩스를 입력해주세요'} {...register('fax')} />
                  </dd>
                </dl>
                <dl>
                  <dt>휴대폰번호</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder={'휴대폰번호를 입력해주세요'}
                      {...register('hp')}
                    />
                  </dd>
                </dl>
              </div>
              <dl className='addr'>
                <dt>사업자주소</dt>
                <dd>
                  <p>
                    <input type='text' {...register('zipcode')} />
                    <button type='button'>우편번호검색</button>
                  </p>
                  <p>
                    <input type='text' {...register('address1')} />
                  </p>
                  <p>
                    <input
                      type='text'
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
              {isCreate ? '등록' : '수정'}
            </button>
            <button type='button' className='btn btn-large line1' onClick={cancel}>
              취소
            </button>
          </div>
          <input type={'text'} {...register('group')} style={{ display: 'none' }} />
        </form>
      </div>
    </div>
  )
}
