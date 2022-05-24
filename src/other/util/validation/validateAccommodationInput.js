import {
  ACCOMODATION_NAME_IS_EMPTY,
  ADDRESS1_IS_EMPTY,
  SALESTARTDATE_IS_EMPTY,
  TEL_IS_EMPTY,
} from '@constant/message'
import { validationWithMessage } from './validationFunction'

//등급, 숙소명, 전화번호 , 주소, 판매시작일, 종료일
export const validateAccommodationInput = (createAccommodationData) => {
  const {
    cpNo,
    name,
    tel,
    address1,
    // address2,
    // positionX,
    // positionY,
    saleStartdate,
  } = createAccommodationData

  const validationArray = [
    { compare: cpNo === 'unSelected', message: '회사명을 선택해주세요' },
    { compare: name === '', message: ACCOMODATION_NAME_IS_EMPTY },
    { compare: tel === '', message: TEL_IS_EMPTY },
    { compare: address1 === '', message: ADDRESS1_IS_EMPTY },
    // { compare: positionY === '', message: POSITIONY_IS_EMPTY },
    // { compare: positionX === '', message: POSITIONX_IS_EMPTY },
    { compare: saleStartdate === '', message: SALESTARTDATE_IS_EMPTY },
  ]

  const { isValid, message } = validationWithMessage(validationArray)
  if (isValid) {
    alert(message)
    return false
  }
  return createAccommodationData
}
