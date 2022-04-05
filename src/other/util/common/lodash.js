import { range } from 'lodash/fp'

export const numberToArray = (number) => range(1)(number + 1)
export const numberRangeToArray = (startNumber) => (endNumber) => range(startNumber)(endNumber + 1)
