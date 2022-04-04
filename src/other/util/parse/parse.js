import _ from 'lodash/fp'

const splitComma = _.split(',')
const splitColon = _.split(':')
export const parseCustomData1 = (addBreakfastFee) => {
  const breakfastArray = splitComma(addBreakfastFee)
  let tempObject = {}
  const eachBreakfast = _.each((element) => {
    const elementArray = splitColon(element)
    tempObject = { ...tempObject, [elementArray[0]]: elementArray[1] }
  })
  eachBreakfast(breakfastArray)
  return tempObject
}
const splitSlash = _.split('//')
const splitBar = _.split('||')
export const parseCustomData2 = (addBreakfastFee) => {
  const breakfastArray = splitSlash(addBreakfastFee)
  let tempObject = {}
  const eachBreakfast = _.each((element) => {
    const elementArray = splitBar(element)
    tempObject = { ...tempObject, [elementArray[0]]: elementArray[1] }
  })
  eachBreakfast(breakfastArray)
  return tempObject
}
