import { atom, selectorFamily } from 'recoil'
import { AUTH_RESULT_ATOM_KEY, SIGNIN_SELECTOR_KEY } from '../../other/constant/atomKeys'
import { signin } from '../api/auth'

//atom
export const authResultAtom = atom({
  key: AUTH_RESULT_ATOM_KEY,
  default: {
    auth: null,
    authError: null,
    authSuccess: null,
  },
})

//selector
export const signinSelector = selectorFamily({
  key: SIGNIN_SELECTOR_KEY,
  get:
    ({ username, password }) =>
    async () =>
      await signin({
        username,
        password,
      }),
})
