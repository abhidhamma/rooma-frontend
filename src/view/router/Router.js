import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReservationScheduler from '../pages/ReservationScheduler'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='reservationScheduler' element={<ReservationScheduler />} />
      </Routes>
    </BrowserRouter>
  )
}
