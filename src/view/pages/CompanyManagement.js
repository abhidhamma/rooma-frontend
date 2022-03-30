import { Outlet } from 'react-router-dom'
import Header from '@components/common/Header/Header'
import { Suspense } from 'react'

export default function CompanyManagement() {
  return (
    <>
      <Header />
      <Suspense fallback={<div></div>}>
        <Outlet />
      </Suspense>
    </>
  )
}
