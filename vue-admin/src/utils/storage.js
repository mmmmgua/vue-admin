const localStorage = window.localStorage

export function setStorage(key, value) {
  localStorage.setItem(key, value)
}

export function getStorage(key) {
  return localStorage.getItem(key)
}

export function clearStorage() {
  localStorage.clear()
}

export function removeStorage(key) {
  localStorage.removeItem(key)
}
