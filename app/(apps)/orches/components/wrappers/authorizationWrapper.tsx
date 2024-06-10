'use client'
import React, { useEffect } from 'react'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/LocalStorage'
import Login from '@/app/(apps)/orches/components/auth/login'
import { redirectToAuthCodeFlow } from '@/utils/spotify/script'

export default function AuthorizationWrapper({
  children,
  accessToken,
  setAccessToken,
  isLoading,
  setIsLoading,
}: {
  children: React.ReactNode
  accessToken: string | null
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  let code: string | null = null
  if (typeof window !== 'undefined') {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const saveLocalData = (data: AccessTokenSuccessData): void => {
    setLocalStorageItem('access_token', data.access_token)
    setLocalStorageItem(
      'expired_date',
      new Date(Date.now() + data.expires_in * 1000).toISOString(),
    )
    setLocalStorageItem('refresh_token', data.refresh_token)
  }
  useEffect(() => {
    setIsLoading(true)
    const accessTokenLocal = getLocalStorageItem('access_token')
    const refreshTokenLocal = getLocalStorageItem('refresh_token')
    const expiredDateLocal = getLocalStorageItem('expired_date')
    const expiredDate =
      expiredDateLocal !== null ? new Date(expiredDateLocal) : null
    if (
      accessToken === null &&
      accessTokenLocal !== null &&
      expiredDate !== null &&
      expiredDate > new Date()
    ) {
      setAccessToken(accessTokenLocal)
    } else if (
      accessToken === null &&
      accessTokenLocal !== null &&
      expiredDate !== null &&
      expiredDate < new Date() &&
      refreshTokenLocal !== null
    ) {
      fetch('/api/spotify/authorization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: refreshTokenLocal,
          grantType: 'refresh_token',
        }),
      })
        .then(async (response) => await response.json())
        .then((data: AccessTokenSuccessData) => {
          if ('access_token' in data) {
            setAccessToken(data.access_token)
            saveLocalData(data)
          }
        })
        .catch((error) => {
          console.error(error.message)
        })
    } else if (
      accessToken === null &&
      accessTokenLocal === null &&
      code !== null
    ) {
      const url = new URL(window.location.toString())
      url.searchParams.delete('code')
      window.history.replaceState({}, document.title, url.toString())

      const verifier = getLocalStorageItem('verifier')
      fetch('/api/spotify/authorization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          verifier,
          grantType: 'authorization_code',
        }),
      })
        .then(async (response) => await response.json())
        .then((data: AccessTokenSuccessData) => {
          if ('access_token' in data && accessToken === null) {
            setAccessToken(data.access_token)
            saveLocalData(data)
          }
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
    setIsLoading(false)
  }, [accessToken, code, setAccessToken, setIsLoading]) // Include accessToken and code in the dependency array

  const handlerAuthorization: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    redirectToAuthCodeFlow().catch((error) => {
      console.error(error)
    })
  }
  return (
    <>
      {isLoading ? (
        <div className="bg-spotify-background h-full w-full text-white">
          Loading...
        </div>
      ) : null}
      {accessToken === null && !isLoading && (
        <Login handlerAuthorization={handlerAuthorization} />
      )}
      {accessToken !== null && !isLoading && <>{children}</>}
    </>
  )
}
