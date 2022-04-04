//accommodationManagement 메뉴의 URL
const ACCOMMODATION_MANAGEMENT_SLUG = '/accommodation'
export const ACCOMMODATION_LIST_URL = `${ACCOMMODATION_MANAGEMENT_SLUG}/list`
export const CREATE_ACCOMMODATION_URL = `${ACCOMMODATION_MANAGEMENT_SLUG}/new`
export const makeUpdateAccommodationUrl = (acNo) => `${ACCOMMODATION_MANAGEMENT_SLUG}/form/${acNo}`

export const ROOMTYPE_SLUG = `${ACCOMMODATION_MANAGEMENT_SLUG}/roomType`
export const ROOMTYPE_LIST_URL = `${ROOMTYPE_SLUG}/list`
export const CREATE_ROOMTYPE_URL = `${ROOMTYPE_SLUG}/new`
export const makeUpdateRoomTypeUrl = (rtNo) => `${ROOMTYPE_SLUG}/form/${rtNo}`

export const ROOM_SLUG = `${ACCOMMODATION_MANAGEMENT_SLUG}/room`
export const ROOM_LIST_URL = `${ROOM_SLUG}/list`
export const CREATE_ROOM_FORM_URL = `${ROOM_SLUG}/new`
export const makeUpdateRoomUrl = (rmNo) => `${ROOM_SLUG}/form/${rmNo}`

//companyManagement 메뉴의 URL
export const COMPANY_SLUG = '/company'
export const COMPANY_LIST_URL = `${COMPANY_SLUG}/list`
export const CREATE_COMPANY_URL = `${COMPANY_SLUG}/new`
export const makeUpdateCompanyUrl = (cpNo) => `${COMPANY_SLUG}/form/${cpNo}`
