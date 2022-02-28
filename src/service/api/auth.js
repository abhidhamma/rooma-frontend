import { AUTHENTICATE_URL } from '../../other/constant/apiURLs'
import client from '../../other/config/axiosClient'

export const signIn = ({ username, password }) =>
  client.post(AUTHENTICATE_URL, {
    username,
    password,
  })
