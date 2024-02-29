'use client'
import React, { createContext, useState, useEffect } from 'react'
import { NextUIWrapper } from '@/app/components/nextUIWrapper'
import { redirectToAuthCodeFlow } from '@/utils/spotify/script'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/LocalStorage'

interface BeatsFlowContextType {
  accessToken: string | null
}

export const BeatsflowContext = createContext<BeatsFlowContextType | null>(null)

export const BeatsflowAppWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  let code: string | null = null
  if (typeof window !== 'undefined') {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const context = {
    accessToken,
  }

  useEffect(() => {
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
      console.log('Access token is valid')
      setAccessToken(accessTokenLocal)
    } else if (
      accessToken === null &&
      accessTokenLocal !== null &&
      expiredDate !== null &&
      expiredDate < new Date() &&
      refreshTokenLocal !== null
    ) {
      console.log('Access token is expired, refreshing...')
      fetch('/api/spotify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refresh_token: refreshTokenLocal,
          grantType: 'refresh_token',
        }),
      })
        .then(async (response) => await response.json())
        .then((data: AccessTokenSuccessData) => {
          if ('access_token' in data) {
            setAccessToken(data.access_token)
            setLocalStorageItem('access_token', data.access_token)
            setLocalStorageItem(
              'expired_date',
              new Date(Date.now() + data.expires_in * 1000).toISOString(),
            )
            setLocalStorageItem('refresh_token', data.refresh_token)
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
      console.log('No Access Token is found, creating a new one...')
      const url = new URL(window.location.toString())
      url.searchParams.delete('code')
      window.history.replaceState({}, document.title, url.toString())

      const verifier = getLocalStorageItem('verifier')
      fetch('/api/spotify', {
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
            setLocalStorageItem('access_token', data.access_token)
            setLocalStorageItem(
              'expired_date',
              new Date(Date.now() + data.expires_in * 1000).toISOString(),
            )
            setLocalStorageItem('refresh_token', data.refresh_token)
          }
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
    setIsLoading(false)
  }, [accessToken, code]) // Include accessToken and code in the dependency array

  const handlerAuthorization: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    redirectToAuthCodeFlow().catch((error) => {
      console.error(error)
    })
  }

  return (
    <NextUIWrapper>
      <BeatsflowContext.Provider value={context}>
        {isLoading ? <div>Loading...</div> : null}
        {accessToken === null && !isLoading ? (
          <div>
            <button
              onClick={handlerAuthorization}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Login with Spotify
            </button>
          </div>
        ) : (
          children
        )}
      </BeatsflowContext.Provider>
    </NextUIWrapper>
  )
}

export default BeatsflowAppWrapper
