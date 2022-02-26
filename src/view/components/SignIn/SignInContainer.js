import SignInInput from './SignInInput'

export default function SignInContainer() {
  return (
    <>
      <div id='skip-nav'>
        <a href='#gnb'>주메뉴 바로가기</a>
        <a href='#container'>본문 바로 가기</a>
      </div>
      {/* <!-- S:Header --> */}
      <header>
        <div id='header'>
          <h1>ROOMA</h1>
        </div>
      </header>
      {/* <!-- E:Header --> */}
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <div className='full-content'>
          <div className='loginWrap'>
            <div className='loginBox'>
              <div className='login'>
                <h2>Login</h2>
                <div className='center mgb_25 mgt_15'>
                  <p>로그인을 위해서는 아이디,비밀번호 입력이 필요합니다</p>
                </div>
                <div className='inputArea'>
                  <SignInInput />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
