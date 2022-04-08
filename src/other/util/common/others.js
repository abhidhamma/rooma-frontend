//가격포맷일때 쉼표를 붙여준다
export function formatMoney(string) {
  return Number(string).toLocaleString()
}
//NaN일때 0으로 바꿔준다
export function zeroOrNumber(parameter) {
  return isNaN(Number(parameter)) ? 0 : Number(parameter)
}
//object에서 value로 key를 가져온다
export const getKeyFromValue = (map, findValue) => {
  for (const [key, value] of Object.entries(map)) {
    if (value === findValue) {
      return key
    }
  }
}
