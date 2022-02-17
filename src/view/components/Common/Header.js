export default function Header() {
  return (
    // <!-- S:Header -->
    <header>
      <div id='header'>
        <h1>ROOMA</h1>
        <nav>
          <div id='gnb'>
            <a href='/#'>대시보드</a>
            <a href='/#'>예약현황</a>
            <a href='/#'>예약관리</a>
            <a href='/#'>숙소관리</a>
            <a href='/#'>요금관리</a>
            <a href='/#'>공지사항</a>
          </div>
          <div className='top-menu'>
            <select>
              <option>나인뿌띠끄호텔</option>
            </select>
            <div className='profile'>
              <a href='/#'>admin</a>
              <span>접속중</span>
            </div>
            <div className='top-menu1'>
              <a href='/#'>업체관리</a>
              <a href='/#'>로그아웃</a>
            </div>
            <div className='top-menu2'>
              <a href='/#' className='alarm'>
                <span className='hdn'>알람</span>
                <span className='new'></span>
              </a>
              <a href='/#' className='setting'>
                <span className='hdn'>설정</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
    // <!-- E:Header -->
  )
}
