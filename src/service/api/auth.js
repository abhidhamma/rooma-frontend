import { AUTHENTICATE_URL } from "@constant/apiURLs"
import client from "@config/axiosClient"

export const signIn = ({ username, password }) =>
  client.post(AUTHENTICATE_URL, {
    username,
    password,
  })
