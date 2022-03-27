import {
  ACCOMMODATION_UNSELECTED,
  BASICPERSONNUM_IS_EMPTY,
  MAXPERSONNUM_IS_EMPTY,
  ROOMCOMPOSITION_IS_EMPTY,
  ROOMTYPENAME_IS_EMPTY,
  SALEENDDATE_IS_EMPTY,
  SALESTARTDATE_IS_EMPTY,
} from '@constant/message/roomType'
import { validationWithMessage } from './validationFunction'

//숙소명, 객실타입명, 판매시작일, 판매종료일, 객실구성, 기준인원, 최대인원
export const validateRoomTypeForm = (formData) => {
  const {
    acNo,
    roomTypeName,
    saleStartdate,
    saleEnddate,
    roomComposition,
    // basicPersionNum,
    // maxPersionNum,
  } = formData
  const validationArray = [
    { compare: acNo === 'unSelected', message: ACCOMMODATION_UNSELECTED },
    { compare: roomTypeName === '', message: ROOMTYPENAME_IS_EMPTY },
    { compare: saleStartdate === '', message: SALESTARTDATE_IS_EMPTY },
    { compare: saleEnddate === '', message: SALEENDDATE_IS_EMPTY },
    { compare: roomComposition === '', message: ROOMCOMPOSITION_IS_EMPTY },
    // { compare: basicPersionNum === '', message: BASICPERSONNUM_IS_EMPTY },
    // { compare: maxPersionNum === '', message: MAXPERSONNUM_IS_EMPTY },
  ]

  const { isValid, message } = validationWithMessage(validationArray)

  if (isValid) {
    alert(message)
    return false
  }
  return formData
}
