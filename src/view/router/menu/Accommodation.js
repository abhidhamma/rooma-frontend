import CreateAccommodation from '@components/Accommodation/Accommodation/Form/CreateAccommodation'
import UpdateAccommodation from '@components/Accommodation/Accommodation/Form/UpdateAccommodation'
import AccommodationList from '@components/Accommodation/Accommodation/List/List'
import CreateRoomType from '@components/Accommodation/RoomType/Form/CreateRoomType'
import UpdateRoomType from '@components/Accommodation/RoomType/Form/UpdateRoomType'
import RoomTypeList from '@components/Accommodation/RoomType/List/List'
import Accommodation from '@pages/Accommodation'
import { Route, Routes } from 'react-router-dom'

//숙소관리 메뉴에 해당하는 경로
export default function AccommodationRoute() {
  return (
    <>
      <Routes>
        <Route element={<Accommodation />}>
          {/* 숙소등록관리 */}
          <Route index path='accommodation' element={<AccommodationList />} />
          <Route path='accommodation/:accommodationId' element={<UpdateAccommodation />} />
          <Route path='accommodation/new' element={<CreateAccommodation />} />
          {/* 객실타입등록관리 */}
          <Route path='roomType' element={<RoomTypeList />} />
          <Route path='roomType/:roomTypeId' element={<UpdateRoomType />} />
          <Route path='roomType/new' element={<CreateRoomType />} />
        </Route>
      </Routes>
    </>
  )
}
