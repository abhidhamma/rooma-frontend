import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '../../service/state/common/common'
import Header from '../components/Common/Header'
import Container from '../components/ReservationScheduler/Container'

export default function ReservationScheduler() {
  console.log('ReservationScheduler called...')
  const isLoggedIn = useRecoilValue(isLoggedInAtom)
  console.log(isLoggedIn)
  return (
    <>
      <Header />
      <Container />
    </>
  )
}
