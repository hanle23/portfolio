'use client'

const serviceItems = ['access_token', 'expires_date', 'refresh_token']

export function getLocalStorageItem(key: string): string | null {
  return window.localStorage.getItem(key)
}

export function setLocalStorageItem(key: string, value: string): void {
  window.localStorage.setItem(key, value)
}

export function removeSpecificLocalStorageItem(key: string): void {
  window.localStorage.removeItem(key)
}

export function removeAllServiceItems(): void {
  serviceItems.forEach((key) => {
    removeSpecificLocalStorageItem(key)
  })
}
