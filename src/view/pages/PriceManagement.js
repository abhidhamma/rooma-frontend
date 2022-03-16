import { Outlet } from 'react-router-dom'
import Header from '@components/common/Header/Header'

export default function PriceManagement() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
