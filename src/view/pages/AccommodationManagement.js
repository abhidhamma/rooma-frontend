import { Outlet } from 'react-router-dom'
import Header from '@components/common/Header/Header'
import { Suspense } from 'react'

export default function AccommodationManagement() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}
