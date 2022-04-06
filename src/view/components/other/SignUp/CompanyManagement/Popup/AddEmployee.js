export default function AddEmployee({ setIsShowDimmdLayer, setIsAddEmployeeOpen }) {
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
                  <input type='text' placeholder='아이디 (영문 or 영문+숫자)' />
                </dd>
              </dl>
              <dl>
                <dt>비밀번호</dt>
                <dd>
                  <input type='text' placeholder='비밀번호 입력' />
                </dd>
              </dl>
              <dl>
                <dt>담당자명</dt>
                <dd>
                  <input type='text' placeholder='담당자명 입력' />
                </dd>
              </dl>
              <dl>
                <dt>역할</dt>
                <dd>
                  <input type='text' placeholder='역할 입력' />
                </dd>
              </dl>
              <dl>
                <dt>메모</dt>
                <dd>
                  <textarea placeholder='메모 입력'></textarea>
                </dd>
              </dl>
            </section>
          </div>

          {/* <!-- E:레이어 컨텐츠 --> */}
          <div className='pop-footer'>
            <a href='#' className='btn-reserv'>
              추가하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
