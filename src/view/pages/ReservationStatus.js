import Header from '@components/common/Header/Header'
import Container from '@components/menu/ReservationStatus/Container'
import { Suspense } from 'react'

export default function ReservationStatus() {
  console.log('ReservationStatus called...')
  return (
    <>
      <Header />
      <Suspense fallback={<div></div>}>
        <Container />
      </Suspense>
    </>
  )
}
