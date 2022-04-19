import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { removeItem } from '@util/common/localStorage'
import { isLoggedInAtom } from '@state/common/common'
import { userAtom } from '@state/common/user'
import AccommodationSelect from './AccommodationSelect'
import { Suspense } from 'react'

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
          <Link to={'/schedule'}>ROOMA</Link>
        </h1>
        <nav>
          <div id='gnb'>
            {/* <a href='#'>대시보드</a> */}
            <Link to={'/schedule'}>예약현황</Link>
            <Link to={'/reservationManagement'}>예약관리</Link>
            <Link to={'/accommodation/list'}>숙소관리</Link>
            <Link to={'/priceManagement'}>요금관리</Link>
            <Link to={'/calculate'}>정산관리</Link>
            {/* <a href='#'>키관리</a> */}
            <Link to={'/cleaning'}>청소관리</Link>
            <a href='#'>공지사항</a>
            {/* <a href='#'>메뉴추가</a> */}
          </div>
          <div className='top-menu'>
            <Suspense
              fallback={
                <select>
                  <option>업체목록</option>
                </select>
              }
            >
              <AccommodationSelect />
            </Suspense>
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
