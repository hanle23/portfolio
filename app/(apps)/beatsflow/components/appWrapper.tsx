'use client'
import React, { createContext, useState, useEffect } from 'react'
import { redirectToAuthCodeFlow } from '@/utils/spotify/script'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/LocalStorage'
import { Header } from '@/app/(apps)/beatsflow/components/header'
import { NextUIProvider } from '@nextui-org/react'
import Login from '@/app/(apps)/beatsflow/components/login'

interface BeatsFlowContextType {
  accessToken: string | null
  isLoading: boolean
  profile: UserProfile | null
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>
}

export const BeatsflowContext = createContext<BeatsFlowContextType | null>(null)

export const BeatsflowAppWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  let code: string | null = null
  if (typeof window !== 'undefined') {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const context = {
    accessToken,
    isLoading,
    profile,
    setProfile,
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
  }, [accessToken, code]) // Include accessToken and code in the dependency array

  useEffect(() => {
    fetch('/api/spotify/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(async (response) => await response.json())
      .then((data: UserProfile) => {
        if ('display_name' in data) {
          console.log(data)
          setProfile(data)
        }
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [accessToken])

  const handlerAuthorization: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    redirectToAuthCodeFlow().catch((error) => {
      console.error(error)
    })
  }

  return (
    <NextUIProvider className="h-full w-full">
      <BeatsflowContext.Provider value={context}>
        {isLoading ? <div>Loading...</div> : null}
        {accessToken === null && !isLoading && (
          <Login handlerAuthorization={handlerAuthorization} />
        )}
        {accessToken !== null && !isLoading && (
          <div className="h-full w-full bg-spotify-background text-white">
            <Header accessToken={accessToken} setAccessToken={setAccessToken} />
            {children}
          </div>
        )}
      </BeatsflowContext.Provider>
    </NextUIProvider>
  )
}

export default BeatsflowAppWrapper
