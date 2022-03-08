import {
  ACCOMODATION_NAME_IS_EMPTY,
  ADDRESS1_IS_EMPTY,
  AREA1_IS_EMPTY,
  AREA2_IS_EMPTY,
  BANKACCOUNT_IS_EMPTY,
  CHECKINTIME_IS_EMPTY,
  CHECKOUTTIME_IS_EMPTY,
  DESCROPTION_IS_EMPTY,
  NOTICE_IS_EMPTY,
  POSITIONX_IS_EMPTY,
  POSITIONY_IS_EMPTY,
  SALEENDDATE_IS_EMPTY,
  SALESTARTDATE_IS_EMPTY,
  TEL_IS_EMPTY,
} from '@constant/message'
import { validationWithMessage } from './validationFunction'

export const validateAccommodationInput = (createAccommodationData) => {
  const {
    name,
    tel,
    address1,
    // address2,
    positionX,
    positionY,
    bankAccount,
    saleStartdate,
    saleEnddate,
    area1,
    area2,
    checkinTime,
    checkoutTime,
    description,
    notice,
  } = createAccommodationData

  const validationArray = [
    { compare: name === '', message: ACCOMODATION_NAME_IS_EMPTY },
    { compare: tel === '', message: TEL_IS_EMPTY },
    { compare: address1 === '', message: ADDRESS1_IS_EMPTY },
    { compare: positionY === '', message: POSITIONY_IS_EMPTY },
    { compare: positionX === '', message: POSITIONX_IS_EMPTY },
    { compare: bankAccount === '', message: BANKACCOUNT_IS_EMPTY },
    { compare: saleStartdate === '', message: SALESTARTDATE_IS_EMPTY },
    { compare: saleEnddate === '', message: SALEENDDATE_IS_EMPTY },
    { compare: area1 === '', message: AREA1_IS_EMPTY },
    { compare: area2 === '', message: AREA2_IS_EMPTY },
    { compare: checkinTime === '', message: CHECKINTIME_IS_EMPTY },
    { compare: checkoutTime === '', message: CHECKOUTTIME_IS_EMPTY },
    { compare: description === '', message: DESCROPTION_IS_EMPTY },
    { compare: notice === '', message: NOTICE_IS_EMPTY },
  ]

  const { isValid, message } = validationWithMessage(validationArray)
  if (isValid) {
    alert(message)
    return false
  }
  return createAccommodationData
}
