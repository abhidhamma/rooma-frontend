import { COMPANY_LIST_URL } from '@constant/locationURLs'
import { loadItem } from '@util/common/localStorage'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import CompanyList from './CompanyManagement/List/List'
import CompanySelect from './CompanySelect'
import SignUpSuperAdminContainer from './SignUpSuperAdminContainer'
import UpdateUserInfoContainer from './UpdateUserInfoContainer'

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
        {isSuperAdmin ? (
          // <Suspense fallback={<div></div>}>
          //   <SignUpSuperAdminContainer />
          // </Suspense>

          <Navigate replace to={COMPANY_LIST_URL} />
        ) : (
          <Suspense fallback={<div></div>}>
            <UpdateUserInfoContainer />
          </Suspense>
        )}

        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}
