export const IS_PRODUCTION = process.env.REACT_APP_NODE_ENV === 'production'
console.log('IS_PRODUCTION')
console.log(process.env.REACT_APP_NODE_ENV)
console.log(process.env.REACT_APP_SERVER_URL)

// API server 주소
export const SERVER_URL = IS_PRODUCTION ? process.env.REACT_APP_SERVER_URL : 'http://localhost:7070'

// client 주소
export const CLIENT_URL = IS_PRODUCTION ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3000'

// API
const API_PREFIX = 'api'
// auth
const authUrl = (rest) => `${SERVER_URL}/${API_PREFIX}/auth/${rest}`
export const SIGNIN_URL = authUrl('signin')
const jwtUrl = (rest) => `${SERVER_URL}/${API_PREFIX}/jwt/${rest}`
export const AUTHENTICATE_URL = jwtUrl('authenticate')
