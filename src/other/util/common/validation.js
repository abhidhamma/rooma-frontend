export const alertValidation = (compare, message) => {
  if (compare) {
    alert(message)
    return compare
  }
}
