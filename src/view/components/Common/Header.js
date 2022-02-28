import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { removeItem } from '../../../other/util/common/localStorage'
import { isLoggedInAtom } from '../../../service/state/common/common'
import { userAtom } from '../../../service/state/common/user'

export default function Header() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)
  const user = useRecoilValue(userAtom)
  let navigate = useNavigate()
  console.log(user)
  const removeUser = () => {
    removeItem('user')
    setIsLoggedIn(false)
    navigate('/')
  }
  return (
    // <!-- S:Header -->
    <header>
      <div id='header'>
        <h1>
          <Link to={'/reservationScheduler'}>ROOMA</Link>
        </h1>
        <nav>
          <div id='gnb'>
            <a href='#'>대시보드</a>
            <a href='#'>예약현황</a>
            <a href='#'>예약관리</a>
            <a href='#'>숙소관리</a>
            <a href='#'>요금관리</a>
            <a href='#'>공지사항</a>
          </div>
          <div className='top-menu'>
            <select>
              <option>신라호텔</option>
            </select>
            <div className='profile'>
              <a href='#'>{user?.name ? user.name : 'admin'}</a>
              <span>접속중</span>
            </div>
            <div className='top-menu1'>
              <Link to={'/signUp'}>업체관리</Link>
              <a onClick={removeUser}>로그아웃</a>
            </div>
            <div className='top-menu2'>
              <a href='#' className='alarm'>
                <span className='hdn'>알람</span>
                <span className='new'></span>
              </a>
              <a href='#' className='setting'>
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
