import {
  END_DATE_UNSELECTED,
  PRICE_INPUT_EMPTY,
  ROOM_TYPE_UNSELECTED,
  START_DATE_UNSELECTED,
} from '@constant/message/periodPriceManagement'

import { validationWithMessage } from './validationFunction'

export const validateSavePeriodRoomPrice = (roomType, selectedDate) => (formData) => {
  const { rtNo } = roomType
  const { startDate, endDate } = selectedDate
  const isEmptyInputExist = Object.values(formData).find((value) => value === '') !== undefined

  const validationArray = [
    { compare: rtNo === 'unSelected', message: ROOM_TYPE_UNSELECTED },
    { compare: startDate === '선택해주세요', message: START_DATE_UNSELECTED },
    { compare: endDate === '선택해주세요', message: END_DATE_UNSELECTED },
    { compare: isEmptyInputExist, message: PRICE_INPUT_EMPTY },
  ]

  const { isValid, message } = validationWithMessage(validationArray)

  if (isValid) {
    alert(message)
    return false
  }
  return formData
}
