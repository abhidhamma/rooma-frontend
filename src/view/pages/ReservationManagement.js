import { Outlet } from 'react-router-dom'
import Header from '@components/common/Header/Header'

export default function ReservationManagement() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
