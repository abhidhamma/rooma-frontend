import {
  ACCOMMODATION_UNSELECTED,
  ROOM_NAME_IS_EMPTY,
  ROOM_TYPE_UNSELECTED,
  SALE_END_DATE_IS_EMPTY,
  SALE_START_DATE_IS_EMPTY,
} from '@constant/message/room'
import { validationWithMessage } from './validationFunction'

export const validateRoomForm = (roomFormData) => {
  const { acNo, rtNo, name, saleStartdate, saleEnddate } = roomFormData

  const validationArray = [
    { compare: acNo === 'unSelected', message: ACCOMMODATION_UNSELECTED },
    { compare: rtNo === 'unSelected', message: ROOM_TYPE_UNSELECTED },
    { compare: name === '', message: ROOM_NAME_IS_EMPTY },
    { compare: saleStartdate === '', message: SALE_START_DATE_IS_EMPTY },
    { compare: saleEnddate === '', message: SALE_END_DATE_IS_EMPTY },
  ]

  const { isValid, message } = validationWithMessage(validationArray)

  if (isValid) {
    alert(message)
    return false
  }
  return roomFormData
}
