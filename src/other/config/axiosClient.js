import axios from 'axios'
import { signIn } from '../../service/api/auth'
import { SERVER_URL } from '../constant/apiURLs'
import { getCookie, setCookie } from '../util/common/cookie'
import { decode } from '../util/common/hash'
import { loadItem } from '../util/common/localStorage'

// axios 설정
const clientConfig = () => {
  const client = axios.create({
    headers: {
      // cors설정
      'Access-Control-Allow-Origin': SERVER_URL, // 서버 domain
      'Cache-Control': 'no-cache',
      // 'Content-Type': 'multipart/form-data',
    },

    // api요청이 절대경로가 아니면
    // 주소앞에 beseURL을 붙이도록 설정
    baseURL: SERVER_URL,

    // 서버와 클라이언트가 다른 origin을 가질 경우에
    // header에 token(cookie)이 추가되도록 설정
    // cors가 *인경우는 withCredentials:true불가
    //withCredentials: true,
  })

  //응답이 권한없음(200)인 경우
  //localStorage에서 새로운 jwttoken을 받아와서 다시 요청
  client.interceptors.response.use(async (response) => {
    const config = response.config
    const {
      data: { status },
      config: { url },
    } = response

    if (status === 'UNAUTHORIZED' && url.indexOf('signin') === -1) {
      console.log('UNAUTHORIZED jwttoken변경시도')

      const { userId } = loadItem('user')
      const password = decode(loadItem('PAPAGO_LANG_DETECT'))

      console.log(userId)
      console.log(password)

      try {
        const {
          data: { jwttoken },
        } = await signIn({
          username: userId,
          password,
        })
        console.log(jwttoken)

        setCookie('jwttoken', jwttoken)
        config.headers.Authorization = jwttoken ? 'Bearer ' + jwttoken : ''

        return client(config)
      } catch (error) {
        console.log(error)
      }
    }
    return response
  })

  //요청할때마다 토큰과 함께 보내는 설정
  client.interceptors.request.use((config) => {
    const token = getCookie('jwttoken')

    config.headers.Authorization = token ? 'Bearer ' + token : ''

    return config
  })

  return client
}

export default clientConfig()
