export default function SignUpContainer() {
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='content'>
          <div className='titWrap'>
            <h3>회원가입</h3>
          </div>
          <div className='writeArea'>
            <section>
              {/* <!-- 입력폼이 2개일때 --> */}
              <div className='two'>
                <dl>
                  <dt>업체아이디</dt>
                  <dd>
                    <input type='text' placeholder={'업체아이디를 입력해주세요'} />
                  </dd>
                </dl>
                <dl>
                  <dt>업체명</dt>
                  <dd>
                    <input type='text' placeholder={'업체명을 입력해주세요'} />
                  </dd>
                </dl>
              </div>
              {/* <!-- 입력폼이 2개일때 --> */}
              <div className='two'>
                <dl>
                  <dt>대표명</dt>
                  <dd>
                    <input type='text' placeholder={'대표명을 입력해주세요'} />
                  </dd>
                </dl>
                <dl>
                  <dt>사업자등록번호</dt>
                  <dd>
                    <input type='text' placeholder={'사업자등록번호를 입력해주세요'} />
                  </dd>
                </dl>
              </div>
              {/* <!-- 입력폼이 2개일때 --> */}
              <div className='two'>
                <dl>
                  <dt>계좌번호</dt>
                  <dd>
                    <input type='text' placeholder={'계좌번호를 입력해주세요'} />
                  </dd>
                </dl>
                <dl>
                  <dt>홈페이지</dt>
                  <dd>
                    <input type='text' placeholder={'홈페이지를 입력해주세요'} />
                  </dd>
                </dl>
              </div>
              {/* <!-- 입력폼이 2개일때 --> */}
              <div className='two'>
                <dl>
                  <dt>E-mail</dt>
                  <dd>
                    <input type='text' placeholder={'E-mail을 입력해주세요'} />
                  </dd>
                </dl>
                <dl>
                  <dt>전화번호</dt>
                  <dd>
                    <input type='text' placeholder={'전화번호를 입력해주세요'} />
                  </dd>
                </dl>
              </div>
              {/* <!-- 입력폼이 2개일때 --> */}
              <div className='two'>
                <dl>
                  <dt>팩스</dt>
                  <dd>
                    <input type='text' placeholder={'팩스를 입력해주세요'} />
                  </dd>
                </dl>
                <dl>
                  <dt>휴대폰번호</dt>
                  <dd>
                    <input type='text' placeholder={'전화번호를 입력해주세요'} />
                  </dd>
                </dl>
              </div>
              <dl className='addr'>
                <dt>사업자주소</dt>
                <dd>
                  <p>
                    <input type='text' />
                    <button type='button'>우편번호검색</button>
                  </p>
                  <p>
                    <input type='text' />
                  </p>
                  <p>
                    <input type='text' placeholder={'상세주소를 입력해주세요'} />
                  </p>
                </dd>
              </dl>
              <dl className='addr'>
                <dt>관리자메모</dt>
                <dd>
                  <textarea placeholder={'관리자메모를 입력해주세요'}></textarea>
                </dd>
              </dl>
            </section>
            <section>
              <dl className='rowAdd'>
                <dt>직원 아이디 추가</dt>
                <dd>
                  <div className='row tit'>
                    <div>아이디 (영문 or 영문+숫자)</div>
                    <div>비밀번호</div>
                    <div>담당자명</div>
                    <div>
                      <span className='hdn'>추가/삭제</span>
                    </div>
                  </div>
                  <div className='row'>
                    <div>
                      <input type='text' />
                    </div>
                    <div>
                      <input type='text' />
                    </div>
                    <div>
                      <input type='text' />
                    </div>
                    <div>
                      <button type='button' className='btn plus'>
                        <span className='hdn'>추가</span>
                      </button>
                      <button type='button' className='btn minus'>
                        <span className='hdn'>삭제</span>
                      </button>
                    </div>
                  </div>
                </dd>
              </dl>
            </section>
          </div>
          <div className='center mgt_30'>
            <button type='button' className='btn btn-large purple'>
              등록
            </button>
            <button type='button' className='btn btn-large line1'>
              취소
            </button>
          </div>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
