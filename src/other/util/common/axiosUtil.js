export const getFormDataFromJson = (jsonData) => {
  if (jsonData === false) {
    return false
  }

  let formData = new FormData()
  Object.keys(jsonData).map((key) => formData.append(key, jsonData[key]))
  return formData
}
export const getFormDataEntries = (formData) => {
  return Object.fromEntries(formData)
}
export const formDataHeaderConfig = {
  headers: { 'Content-Type': 'multipart/form-data' },
}
