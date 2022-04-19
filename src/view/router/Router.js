import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoggedInAtom } from '@state/common/common'
import ReservationStatus from '@pages/ReservationStatus'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import AccommodationRoute from './menu/Accommodation'
import ReservationManagement from '@pages/ReservationManagement'
import ReservationManagementList from '@components/menu/ReservationManagement/List/List'
import PriceManagementContainer from '@components/menu/PriceManagement/Container/Container'
import PriceManagement from '@pages/PriceManagement'
import CompanyManagement from '@pages/CompanyManagement'
import UpdateCompany from '@components/other/SignUp/CompanyManagement/Form/UpdateCompany'
import CreateCompany from '@components/other/SignUp/CompanyManagement/Form/CreateCompany'
import CompanyList from '@components/other/SignUp/CompanyManagement/List/List'
import ReservationList from '@components/menu/CalculateManagement/ReservationList/List'
import SalesStatusList from '@components/menu/CalculateManagement/SalesStatus/List'
import CalculateManagement from '@pages/CalculateManagement'
import CleaningManagementContainer from '@components/menu/CleaningManagement/Container'
import CleaningManagement from '@pages/CleaningManagement'

export default function Router() {
  //유저라는 이름으로 localStorage에 넣기만 하면 접근할 수 있게된다 이거하고 바꾸자
  const isLoggedIn = useRecoilValue(isLoggedInAtom)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />

        {isLoggedIn && (
          <>
            {/* 로그인 메인(임시로 예약현황 사용) */}
            <Route path='schedule' element={<ReservationStatus />} />
            {/* 회원가입 */}
            <Route path='signUp' element={<SignUp />} />

            {/* 슈퍼어드민일 경우 */}
            <Route path='company' element={<CompanyManagement />}>
              <Route path='list' element={<CompanyList />} />
              <Route path='form/:companyId' element={<UpdateCompany />} />
              <Route path='new' element={<CreateCompany />} />
            </Route>

            {/* 
            메뉴
            1.대시보드, 2.예약현황, 3.예약관리, 4.숙소관리, 5.요금관리, 
            6.정산관리, 7.키관리, 8.청소관리, 9.공지사항, 10.메뉴추가) 
            */}
            {/* 1.대시보드 메뉴*/}
            {/* 2.예약현황 메뉴*/}
            {/* 로그인후 메인으로 사용중 */}
            {/* 3.예약관리 메뉴*/}
            <Route path='reservationManagement' element={<ReservationManagement />}>
              <Route index element={<ReservationManagementList />} />
              {/* 추후 route추가 */}
            </Route>

            {/* 4.숙소관리 메뉴*/}
            <Route path='accommodation/*' element={<AccommodationRoute />} />
            {/* 5.요금관리 메뉴*/}
            <Route path='priceManagement' element={<PriceManagement />}>
              <Route index element={<PriceManagementContainer />} />
            </Route>

            {/* 6.정산관리 메뉴*/}
            <Route path='calculate/*' element={<CalculateManagement />}>
              <Route index element={<ReservationList />} />
              <Route path='account/list' element={<SalesStatusList />} />
            </Route>

            {/* 7.키관리 메뉴*/}
            {/* 8.청소관리 메뉴*/}
            <Route path='cleaning/*' element={<CleaningManagement />}>
              <Route index element={<CleaningManagementContainer />} />
            </Route>
            {/* 9.공지사항 메뉴*/}
            {/* 10.메뉴추가 메뉴*/}
          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}
