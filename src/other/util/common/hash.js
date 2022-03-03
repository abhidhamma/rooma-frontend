export const encode = (password) => {
  const encodeArr = []

  for (let c of password) {
    c = c.charCodeAt()
    encodeArr.push(c)
  }
  encodeArr.reverse()
  return encodeArr
}

export const decode = (encodedPassword) => {
  encodedPassword.reverse()
  let password = ''

  for (let c of encodedPassword) {
    c = String.fromCharCode(c)
    password += c
  }
  return password
}
