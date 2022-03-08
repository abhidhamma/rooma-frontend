import { Outlet } from 'react-router-dom'
import Header from '@components/Common/Header'

export default function Accommodation() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
