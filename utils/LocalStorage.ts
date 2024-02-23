'use client'
export function getLocalStorageItem(key: string): string | null {
  return window.localStorage.getItem(key)
}

export function setLocalStorageItem(key: string, value: string): void {
  window.localStorage.setItem(key, value)
}

export function removeLocalStorageItem(key: string): void {
  window.localStorage.removeItem(key)
}

export function clearLocalStorage(): void {
  window.localStorage.clear()
}
