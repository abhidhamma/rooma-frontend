export const IS_PRODUCTION = process.env.REACT_APP_NODE_ENV === 'production'

// API server 주소
export const SERVER_URL = IS_PRODUCTION ? process.env.REACT_APP_SERVER_URL : 'http://localhost:7070'

// client 주소
export const CLIENT_URL = IS_PRODUCTION
  ? `${window.location.protocol}//${window.location.host}`
  : 'http://localhost:3000'

// API
const API_SLUG = 'api'
// auth
const AUTH_SLUG = 'auth'
const authUrl = (rest) => `${SERVER_URL}/${API_SLUG}/${AUTH_SLUG}/${rest}`
const SINGNIN_SLUG = 'signin'
export const SIGNIN_URL = authUrl(SINGNIN_SLUG)
const JWT_SLUG = 'jwt'
const jwtUrl = (rest) => `${SERVER_URL}/${API_SLUG}/${JWT_SLUG}/${rest}`
const AUTHENTICATE_SLUG = 'authenticate'
export const AUTHENTICATE_URL = jwtUrl(AUTHENTICATE_SLUG)

//v1 (일반적으로 CRUD요청)
const V1_SLUG = 'v1'
const v1Url = (rest) => `${SERVER_URL}/${API_SLUG}/${V1_SLUG}/${rest}`

//업체(회사)관리
const CREATE_COMPANY_API_SLUG = 'company/add'
export const CREATE_COMPANY_API_URL = v1Url(CREATE_COMPANY_API_SLUG)
const READ_COMPANY_BY_NO_API_SLUG = 'company/byNo'
export const READ_COMPANY_BY_NO_API_URL = v1Url(READ_COMPANY_BY_NO_API_SLUG)
const READ_COMPANY_LIST_API_SLUG = 'company/list'
export const READ_COMPANY_LIST_API_URL = v1Url(READ_COMPANY_LIST_API_SLUG)
const UPDATE_COMPANY_API_SLUG = 'company/update'
export const UPDATE_COMPANY_API_URL = v1Url(UPDATE_COMPANY_API_SLUG)

//숙소관리메뉴 - 숙소등록관리
const CREATE_ACCOMMODATION_API_SLUG = 'accmd/add'
export const CREATE_ACCOMMODATION_API_URL = v1Url(CREATE_ACCOMMODATION_API_SLUG)

const READ_ACCOMMODATION_LIST_API_SLUG = 'accmd/list'
export const READ_ACCOMMODATION_LIST_API_URL = v1Url(READ_ACCOMMODATION_LIST_API_SLUG)

const READ_ACCOMMODATION_API_SLUG = 'accmd'
export const READ_ACCOMMODATION_API_URL = v1Url(READ_ACCOMMODATION_API_SLUG)

const UPDATE_ACCOMMODATION_API_SLUG = 'accmd/update'
export const UPDATE_ACCOMMODATION_API_URL = v1Url(UPDATE_ACCOMMODATION_API_SLUG)

//숙소관리메뉴 - 객실타입등록관리
const CREATE_ROOMTYPE_API_SLUG = 'roomtype/add'
export const CREATE_ROOMTYPE_API_URL = v1Url(CREATE_ROOMTYPE_API_SLUG)

const READ_ROOMTYPE_API_SLUG = 'roomtype'
export const READ_ROOMTYPE_API_URL = v1Url(READ_ROOMTYPE_API_SLUG)

const READ_ROOMTYPE_LIST_API_SLUG = 'roomtype/list'
export const READ_ROOMTYPE_LIST_API_URL = v1Url(READ_ROOMTYPE_LIST_API_SLUG)

const UPDATE_ROOMTYPE_API_SLUG = 'roomtype/update'
export const UPDATE_ROOMTYPE_API_URL = v1Url(UPDATE_ROOMTYPE_API_SLUG)

//숙소관리메뉴 - 객실관리
const CREATE_ROOM_SLUG = 'room/add'
export const CREATE_ROOM_URL = v1Url(CREATE_ROOM_SLUG)

const READ_ROOM_SLUG = 'room'
export const READ_ROOM_URL = v1Url(READ_ROOM_SLUG)

const READ_ROOM_LIST_SLUG = 'room/list'
export const READ_ROOM_LIST_URL = v1Url(READ_ROOM_LIST_SLUG)

const UPDATE_ROOM_SLUG = 'room/update'
export const UPDATE_ROOM_URL = v1Url(UPDATE_ROOM_SLUG)

const DELETE_ROOM_SLUG = 'room/delete'
export const DELETE_ROOM_URL = v1Url(DELETE_ROOM_SLUG)

//요금관리 - 객실타입별요금관리
const UPDATE_ROOMTYPE_PRICES_SLUG = 'roomtype/prices/save'
export const UPDATE_ROOMTYPE_PRICES_URL = v1Url(UPDATE_ROOMTYPE_PRICES_SLUG)
//요금관리 - 기간별요금관리
const UPDATE_ROOM_PRICE_PERIOD_SLUG = 'roomprice/period/save'
export const UPDATE_ROOM_PRICE_PERIOD_URL = v1Url(UPDATE_ROOM_PRICE_PERIOD_SLUG)
const READ_ROOM_PRICE_PERIOD_SLUG = 'roomprice'
export const READ_ROOM_PRICE_PERIOD_URL = v1Url(READ_ROOM_PRICE_PERIOD_SLUG)

//요금관리 - 날짜별요금관리
const READ_ROOM_PRICE_LIST_CALENDAR_SLUG = 'roomprice/list'
export const READ_ROOM_PRICE_LIST_CALENDAR_URL = v1Url(READ_ROOM_PRICE_LIST_CALENDAR_SLUG)
const UPDATE_ROOM_PRICE_LIST_CALENDAR_SLUG = 'roomprice/calendar/save'
export const UPDATE_ROOM_PRICE_LIST_CALENDAR_URL = v1Url(UPDATE_ROOM_PRICE_LIST_CALENDAR_SLUG)

//예약현황
const READ_RESERVATION_PRICE_SLUG = 'reserve/schedule'
export const READ_RESERVATION_PRICE_URL = v1Url(READ_RESERVATION_PRICE_SLUG)
const LOCK_ROOM_SLUG = 'room/lock'
export const LOCK_ROOM_URL = v1Url(LOCK_ROOM_SLUG)
const UNLOCK_ROOM_SLUG = 'room/unlock'
export const UNLOCK_ROOM_URL = v1Url(UNLOCK_ROOM_SLUG)
const UPDATE_RESERVATION_STATUS_SLUG = 'reserve/status/update'
export const UPDATE_RESERVATION_STATUS_URL = v1Url(UPDATE_RESERVATION_STATUS_SLUG)
const UPDATE_RESERVATION_DATE_SLUG = 'reserve/move'
export const UPDATE_RESERVATION_DATE_URL = v1Url(UPDATE_RESERVATION_DATE_SLUG)

//예약현황 - 예약팝업
const CREATE_RESERVATION_SLUG = 'reserve/save'
export const CREATE_RESERVATION_URL = v1Url(CREATE_RESERVATION_SLUG)
const READ_RESERVATION_SLUG = 'reserve'
export const READ_RESERVATION_URL = v1Url(READ_RESERVATION_SLUG)
const READ_POSSIBLE_ROOM_LIST_SLUG = 'room/possible/list'
export const READ_POSSIBLE_ROOM_LIST_URL = v1Url(READ_POSSIBLE_ROOM_LIST_SLUG)
