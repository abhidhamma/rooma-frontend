import AES from 'crypto-js/aes'
import cryptoJs from 'crypto-js'
const privateKey = process.env.REACT_APP_ENCODE_KEY
export const encode = (password) => {
  // const encodeArr = []

  // for (let c of password) {
  //   c = c.charCodeAt()
  //   encodeArr.push(c)
  // }
  // encodeArr.reverse()
  return AES.encrypt(password, privateKey).toString()
}

export const decode = (encodedPassword) => {
  // encodedPassword.reverse()
  // let password = ''

  // for (let c of encodedPassword) {
  //   c = String.fromCharCode(c)
  //   password += c
  // }
  return AES.decrypt(encodedPassword, privateKey).toString(cryptoJs.enc.Utf8)
}
