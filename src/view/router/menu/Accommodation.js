import CreateAccommodation from '@components/menu/AccommodationManagement/Accommodation/Form/CreateAccommodation'
import UpdateAccommodation from '@components/menu/AccommodationManagement/Accommodation/Form/UpdateAccommodation'
import AccommodationList from '@components/menu/AccommodationManagement/Accommodation/List/List'
import CreateRoom from '@components/menu/AccommodationManagement/Room/Form/CreateRoom'
import UpdateRoom from '@components/menu/AccommodationManagement/Room/Form/UpdateRoom'
import RoomList from '@components/menu/AccommodationManagement/Room/List/RoomList'
import CreateRoomType from '@components/menu/AccommodationManagement/RoomType/Form/CreateRoomType'
import UpdateRoomType from '@components/menu/AccommodationManagement/RoomType/Form/UpdateRoomType'
import RoomTypeList from '@components/menu/AccommodationManagement/RoomType/List/List'
import AccommodationManagement from '@pages/AccommodationManagement'
import { accommodationListAtom } from '@state/accommodation/accommodation'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'

//숙소관리 메뉴에 해당하는 경로
export default function AccommodationRoute() {
  const resetAccommodationList = useResetRecoilState(accommodationListAtom)

  useEffect(() => {
    resetAccommodationList()
    return () => {
      resetAccommodationList()
    }
  }, [])
  return (
    <>
      <Routes>
        <Route element={<AccommodationManagement />}>
          {/* 숙소등록관리 */}
          <Route index path='accommodation' element={<AccommodationList />} />
          <Route path='accommodation/:accommodationId' element={<UpdateAccommodation />} />
          <Route path='accommodation/new' element={<CreateAccommodation />} />
          {/* 객실타입등록관리 */}
          <Route path='roomType' element={<RoomTypeList />} />
          <Route path='roomType/:roomTypeId' element={<UpdateRoomType />} />
          <Route path='roomType/new' element={<CreateRoomType />} />
          {/* 객실등록관리 */}
          <Route path='room' element={<RoomList />} />
          <Route path='room/:roomId' element={<UpdateRoom />} />
          <Route path='room/new' element={<CreateRoom />} />
        </Route>
      </Routes>
    </>
  )
}
