import axios from 'axios'
import { SERVER_URL } from '../constant/apiURLs'
import { getCookie, setCookie } from '../util/common/cookie'

// axios 설정
const clientConfig = () => {
  console.log('clientConfig called...')
  const client = axios.create({
    headers: {
      // cors설정
      'Access-Control-Allow-Origin': SERVER_URL, // 서버 domain
      'Cache-Control': 'no-cache',
    },

    // api요청이 절대경로가 아니면
    // 주소앞에 beseURL을 붙이도록 설정
    baseURL: SERVER_URL,

    // 서버와 클라이언트가 다른 origin을 가질 경우에
    // header에 token(cookie)이 추가되도록 설정
    // cors가 *인경우는 withCredentials:true불가
    //withCredentials: true,
  })

  //요청할때마다 토큰과 함께 보내는 설정
  client.interceptors.request.use((config) => {
    const token = getCookie('accessToken')

    config.headers.Authorization = token ? 'Bearer ' + token : ''

    return config
  })

  //응답이 401인 경우 refreshToken으로
  //새로운 accessToken받아와서 다시 요청
  client.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const config = error.config

      //로그인일때의 에러는 잡지않는다
      if (config.url !== '/auth/signin' && error.response) {
        if (error.response.status === 401 && !config._retry) {
          console.log('401 에러 발생 accessToken 변경 시도')
          config._retry = true

          try {
            const tokens = await client.post('/api/auth/refreshtoken', {
              refreshToken: getCookie('refreshToken'),
            })

            const { accessToken, refreshToken } = tokens.data

            setCookie('accessToken', accessToken)

            setCookie('refreshToken', refreshToken)

            config.headers.Authorization = accessToken ? 'Bearer ' + accessToken : ''

            return client(config)
          } catch (error) {
            return Promise.reject(error)
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return client
}

export default clientConfig()
