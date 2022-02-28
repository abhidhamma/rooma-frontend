import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '../../service/state/common/common'
import ReservationScheduler from '../pages/ReservationScheduler'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

export default function Router() {
  console.log('router called...')
  //유저라는 이름으로 localStorage에 넣기만 하면 접근할 수 있게된다 이거하고 바꾸자
  const isLoggedIn = useRecoilValue(isLoggedInAtom)
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />

        {isLoggedIn && (
          <>
            <Route path='signUp' element={<SignUp />} />
            <Route path='reservationScheduler' element={<ReservationScheduler />} />
          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
