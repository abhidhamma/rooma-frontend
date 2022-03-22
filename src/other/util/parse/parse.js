import _ from 'lodash/fp'

const splitSlash = _.split('//')
const splitBar = _.split('||')
export default function parseCustomData(addBreakfastFee) {
  const breakfastArray = splitSlash(addBreakfastFee)
  let tempObject = {}
  const eachBreakfast = _.each((element) => {
    const elementArray = splitBar(element)
    tempObject = { ...tempObject, [elementArray[0]]: elementArray[1] }
  })
  eachBreakfast(breakfastArray)
  return tempObject
}
