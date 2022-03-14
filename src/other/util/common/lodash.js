import _ from 'lodash/fp'

export const numberToArray = (number) => _.range(1)(number + 1)
export const numberRangeToArray = (startNumber) => (endNumber) =>
  _.range(startNumber)(endNumber + 1)
