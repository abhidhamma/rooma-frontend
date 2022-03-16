//accommodationManagement 메뉴의 URL
const ACCOMMODATION_MANAGEMENT_URL = '/accommodationManagement'
export const ACCOMMODATION_LIST_URL = `${ACCOMMODATION_MANAGEMENT_URL}/accommodation`
export const CREATE_ACCOMMODATION_URL = `${ACCOMMODATION_LIST_URL}/new`
export const makeUpdateAccommodationUrl = (acNo) => `${ACCOMMODATION_LIST_URL}/${acNo}`

export const ROOMTYPE_LIST_URL = '/accommodationManagement/roomType'
export const CREATE_ROOMTYPE_URL = `${ROOMTYPE_LIST_URL}/new`
export const makeUpdateRoomTypeUrl = (rtNo) => `${ROOMTYPE_LIST_URL}/${rtNo}`

export const ROOM_LIST_URL = '/accommodationManagement/room'
export const CREATE_ROOM_URL = `${ROOM_LIST_URL}/new`
export const makeUpdateRoomUrl = (rmNo) => `${ROOM_LIST_URL}/${rmNo}`
