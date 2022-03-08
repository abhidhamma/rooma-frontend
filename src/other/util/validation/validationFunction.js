import _ from 'lodash/fp'

const findMessage = _.find((object) => object.compare)

export const validationWithMessage = (validationArray) => {
  const result = findMessage(validationArray)
  return result === undefined
    ? { isValid: false, message: 'valid' }
    : { isValid: true, message: result.message }
}
