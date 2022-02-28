import { atom, selectorFamily } from 'recoil'
import { AUTH_RESULT_ATOM_KEY, SIGNIN_SELECTOR_KEY, SIGNUP_SELECTOR_KEY } from '../../other/constant/atomKeys'
import { signIn } from '../api/auth'
import { addCompany } from '../api/company'

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
export const signInSelector = selectorFamily({
  key: SIGNIN_SELECTOR_KEY,
  get:
    ({ username, password }) =>
    async () =>
      await signIn({
        username,
        password,
      }),
})
export const signUpSelector = selectorFamily({
  key: SIGNUP_SELECTOR_KEY,
  get: (formData) => async () => await addCompany(formData),
})
