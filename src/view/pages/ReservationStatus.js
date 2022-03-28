import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '@state/common/common'
import Header from '@components/common/Header/Header'
import Container from '@components/menu/ReservationStatus/Container'
import { Suspense } from 'react'

export default function ReservationStatus() {
  console.log('ReservationStatus called...')
  // const isLoggedIn = useRecoilValue(isLoggedInAtom)
  // console.log(isLoggedIn)
  return (
    <>
      <Header />
      <Suspense fallback={<div></div>}>
        <Container />
      </Suspense>
    </>
  )
}
