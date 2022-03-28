import { loadItem } from '@util/common/localStorage'
import { Suspense } from 'react'
import SignUpSuperAdminContainer from './SignUpSuperAdminContainer'

export default function SignUpContainer() {
  console.log('SignUpContainer called...')
  const {
    authorities: [{ authority }],
  } = loadItem('user')
  const isSuperAdmin = authority === 'ROLE_SUPERMASTER'
  console.log(isSuperAdmin)
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container'>
        {/* <!-- S:content --> */}
        <Suspense fallback={<div></div>}>
          <SignUpSuperAdminContainer />
        </Suspense>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
