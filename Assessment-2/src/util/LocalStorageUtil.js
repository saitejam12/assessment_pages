// Utils to help storing/retrieving from local storage.

export function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
