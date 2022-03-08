import {
  ADDRESS1_IS_EMPTY,
  ADDRESS2_IS_EMPTY,
  CONFIRMCPPW_IS_EMPTY,
  CPID_IS_EMPTY,
  CPPW_IS_EMPTY,
  EMAIL_IS_EMPTY,
  HP_IS_EMPTY,
  NAME_IS_EMPTY,
  OWNERNAME_IS_EMPTY,
  PASSWORD_IS_DIFFERENT,
  ZIPCODE_IS_EMPTY,
} from '@constant/message'
import { validationWithMessage } from './validationFunction'

export const validateSignUpInput = (signUpData) => {
  const validationArray = [
    { compare: signUpData.cpId === '', message: CPID_IS_EMPTY },
    { compare: signUpData.cpPw === '', message: CPPW_IS_EMPTY },
    { compare: signUpData.confirmCpPw === '', message: CONFIRMCPPW_IS_EMPTY },
    { compare: signUpData.cpPw !== signUpData.confirmCpPw, message: PASSWORD_IS_DIFFERENT },
    { compare: signUpData.name === '', message: NAME_IS_EMPTY },
    { compare: signUpData.ownerName === '', message: OWNERNAME_IS_EMPTY },
    { compare: signUpData.hp === '', message: HP_IS_EMPTY },
    { compare: signUpData.email === '', message: EMAIL_IS_EMPTY },
    { compare: signUpData.zipcode === '', message: ZIPCODE_IS_EMPTY },
    { compare: signUpData.address1 === '', message: ADDRESS1_IS_EMPTY },
    { compare: signUpData.address2 === '', message: ADDRESS2_IS_EMPTY },
  ]

  const { isValid, message } = validationWithMessage(validationArray)
  if (isValid) {
    alert(message)
    return false
  }
  return signUpData
}
