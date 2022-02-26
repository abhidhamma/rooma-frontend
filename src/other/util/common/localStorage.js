export const saveItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const loadItem = (key) => {
  const item = localStorage.getItem(key)
  return item === 'undefined' ? null : JSON.parse(item)
}

export const removeItem = (key) => localStorage.removeItem(key)
