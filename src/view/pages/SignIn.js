import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '@state/common/common'
import SignInContainer from '@components/SignIn/SignInContainer'

export default function SignIn() {
  console.log('SignIn called...')
  const isLoggedIn = useRecoilValue(isLoggedInAtom)
  console.log(isLoggedIn)

  return <>{isLoggedIn ? <Navigate replace to='/reservationScheduler' /> : <SignInContainer />}</>
}
