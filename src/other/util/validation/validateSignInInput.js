import { PASSWORD_IS_EMPTY, USERNAME_IS_EMPTY } from '@constant/message'
import { validationWithMessage } from './validationFunction'

export const validateSignInInput = (signInData) => {
  const validationArray = [
    { compare: signInData.username === '', message: USERNAME_IS_EMPTY },
    { compare: signInData.password === '', message: PASSWORD_IS_EMPTY },
  ]
  const { isValid, message } = validationWithMessage(validationArray)
  if (isValid) {
    alert(message)
    return false
  }

  return signInData
}
