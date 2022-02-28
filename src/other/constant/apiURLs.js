export const IS_PRODUCTION = process.env.REACT_APP_NODE_ENV === 'production'
console.log('IS_PRODUCTION')
console.log(process.env.REACT_APP_NODE_ENV)
console.log(process.env.REACT_APP_SERVER_URL)

// API server 주소
export const SERVER_URL = IS_PRODUCTION ? process.env.REACT_APP_SERVER_URL : 'http://localhost:7070'

// client 주소
export const CLIENT_URL = IS_PRODUCTION ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3000'

// API
const API_SLUG = 'api'
const makeUrl = () => ``
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
const ADDCOMPANY_SLUG = 'company/add'
export const ADDCOMPANY_URL = v1Url(ADDCOMPANY_SLUG)
