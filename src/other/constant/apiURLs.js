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

//업체관리
const CREATE_COMPANY_API_SLUG = 'company/add'
export const CREATE_COMPANY_API_URL = v1Url(CREATE_COMPANY_API_SLUG)
const READ_COMPANY_BY_NO_API_SLUG = 'company/byNo'
export const READ_COMPANY_BY_NO_API_URL = v1Url(READ_COMPANY_BY_NO_API_SLUG)
const UPDATE_COMPANY_API_SLUG = 'company/update'
export const UPDATE_COMPANY_API_URL = v1Url(UPDATE_COMPANY_API_SLUG)

//숙소관리 - 숙소등록관리
const CREATE_ACCOMMODATION_API_SLUG = 'accmd/add'
export const CREATE_ACCOMMODATION_API_URL = v1Url(CREATE_ACCOMMODATION_API_SLUG)

const READ_ACCOMMODATION_LIST_API_SLUG = 'accmd/list'
export const READ_ACCOMMODATION_LIST_API_URL = v1Url(READ_ACCOMMODATION_LIST_API_SLUG)

const READ_ACCOMMODATION_API_SLUG = 'accmd'
export const READ_ACCOMMODATION_API_URL = v1Url(READ_ACCOMMODATION_API_SLUG)

const UPDATE_ACCOMMODATION_API_SLUG = 'accmd/update'
export const UPDATE_ACCOMMODATION_API_URL = v1Url(UPDATE_ACCOMMODATION_API_SLUG)

//숙소관리 - 객실타입등록관리
const CREATE_ROOMTYPE_API_SLUG = 'roomtype/add'
export const CREATE_ROOMTYPE_API_URL = v1Url(CREATE_ROOMTYPE_API_SLUG)

const READ_ROOMTYPE_API_SLUG = 'roomtype'
export const READ_ROOMTYPE_API_URL = v1Url(READ_ROOMTYPE_API_SLUG)

const READ_ROOMTYPE_LIST_API_SLUG = 'roomtype/list'
export const READ_ROOMTYPE_LIST_API_URL = v1Url(READ_ROOMTYPE_LIST_API_SLUG)

const UPDATE_ROOMTYPE_API_SLUG = 'roomtype/update'
export const UPDATE_ROOMTYPE_API_URL = v1Url(UPDATE_ROOMTYPE_API_SLUG)

//숙소관리 - 객실관리
const CREATE_ROOM_SLUG = 'room/add'
export const CREATE_ROOM_URL = v1Url(CREATE_ROOM_SLUG)

const READ_ROOM_SLUG = 'room'
export const READ_ROOM_URL = v1Url(READ_ROOM_SLUG)

const READ_ROOM_LIST_SLUG = 'room/list'
export const READ_ROOM_LIST_URL = v1Url(READ_ROOM_LIST_SLUG)

const UPDATE_ROOM_SLUG = 'room/update'
export const UPDATE_ROOM_URL = v1Url(UPDATE_ROOM_SLUG)
