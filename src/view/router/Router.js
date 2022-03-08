import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '@state/common/common'
import ReservationScheduler from '@pages/ReservationScheduler'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import AccommodationRoute from './menu/Accommodation'

export default function Router() {
  //유저라는 이름으로 localStorage에 넣기만 하면 접근할 수 있게된다 이거하고 바꾸자
  const isLoggedIn = useRecoilValue(isLoggedInAtom)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />

        {isLoggedIn && (
          <>
            {/* 로그인 메인 */}
            <Route path='reservationScheduler' element={<ReservationScheduler />} />
            {/* 회원가입 */}
            <Route path='signUp' element={<SignUp />} />
            {/* 숙소관리 메뉴*/}
            <Route path='accommodation/*' element={<AccommodationRoute />} />
          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
