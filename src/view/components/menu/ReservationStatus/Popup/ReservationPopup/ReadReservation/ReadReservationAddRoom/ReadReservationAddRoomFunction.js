export const calculateTotalBreakFastFee = (
  breakfastFeeObject,
  adultBreakFastCount,
  childBreakFastCount,
  infantBreakFastCount
) => {
  const breakfastFeeObjectLength = breakfastFeeObject.length
  let sum = 0

  if (breakfastFeeObjectLength === 0) {
    return sum
  }
  if (breakfastFeeObjectLength >= 1) {
    sum += Number(breakfastFeeObject[0][1]) * adultBreakFastCount
  }
  if (breakfastFeeObjectLength >= 2) {
    sum += Number(breakfastFeeObject[1][1]) * childBreakFastCount
  }
  if (breakfastFeeObjectLength >= 3) {
    sum += Number(breakfastFeeObject[2][1]) * infantBreakFastCount
  }
  return sum
}
export const calculateTotalAdditionalOptionFee = (
  extFeeObject,
  addtionalOption1Count,
  addtionalOption2Count,
  addtionalOption3Count
) => {
  const extFeeObjectLength = extFeeObject.length
  let sum = 0

  if (extFeeObjectLength === 0) {
    return sum
  }
  if (extFeeObjectLength >= 1) {
    sum += Number(extFeeObject[0][1]) * addtionalOption1Count
  }
  if (extFeeObjectLength >= 2) {
    sum += Number(extFeeObject[1][1]) * addtionalOption2Count
  }
  if (extFeeObjectLength >= 3) {
    sum += Number(extFeeObject[2][1]) * addtionalOption3Count
  }
  return sum
}
