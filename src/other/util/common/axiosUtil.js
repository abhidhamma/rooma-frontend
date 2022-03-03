export const getFormDataFromJson = (jsonData) => {
  let formData = new FormData()
  Object.keys(jsonData).map((key) => formData.append(key, jsonData[key]))
  return formData
}
export const getFormDataEntries = (formData) => {
  return Object.fromEntries(formData)
}
export const formDataHeader = {
  headers: { 'Content-Type': 'multipart/form-data' },
}
