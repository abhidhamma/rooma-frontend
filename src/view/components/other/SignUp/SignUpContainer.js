import { loadItem } from '@util/common/localStorage'
import SignUpForm from './SignUpForm'

export default function SignUpContainer() {
  const user = loadItem('user')
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <SignUpForm />
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
