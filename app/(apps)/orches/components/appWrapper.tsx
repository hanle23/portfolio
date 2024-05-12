'use client'

import React, { createContext, useState, useEffect, useRef } from 'react'
import useSWR from 'swr'
import type { Fetcher } from 'swr'
import { redirectToAuthCodeFlow } from '@/utils/spotify/script'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/LocalStorage'
import SideBar from './sideBar'
import { Header } from './header'
import Login from '@/app/(apps)/orches/components/login'
import { usePathname } from 'next/navigation'

export interface OrchesContextType {
  accessToken: string | null
  isLoading: boolean
  profile: UserProfile | null | undefined
  fetcher: Fetcher<any> | undefined
  currPlaylist: PlaylistItem | null
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
  currentTrack: string | null
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>

}

export const OrchesContext = createContext<OrchesContextType | null>(null)

export const OrchesAppWrapper = ({
  children,
  allRoutes,
  setCurrentRoute,
  currentRoute,
}: {
  children: React.ReactNode
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
  currentRoute: string
}): React.JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currPlaylist, setCurrPlaylist] = useState<PlaylistItem | null>(null)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const trackAudio = useRef(
    typeof Audio !== 'undefined' ? new Audio() : undefined,
  )
  const pathname = usePathname()
  const fetcher: Fetcher<any> = (url: string): any =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then(async (res) => await res.json())

  const { data: profile } = useSWR<UserProfile | null>(
    accessToken !== null ? `/api/spotify/profile` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  let code: string | null = null
  if (typeof window !== 'undefined') {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const context = {
    accessToken,
    isLoading,
    profile,
    fetcher,
    currPlaylist,
    setCurrPlaylist,
    currentTrack,
    setCurrentTrack,
    trackAudio,

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

  const handlerAuthorization: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    redirectToAuthCodeFlow().catch((error) => {
      console.error(error)
    })
  }

  return (
    <OrchesContext.Provider value={context}>
      {isLoading ? (
        <div className="bg-spotify-background h-full w-full text-white">
          Loading...
        </div>
      ) : null}
      {accessToken === null && !isLoading && (
        <Login handlerAuthorization={handlerAuthorization} />
      )}
      {accessToken !== null && !isLoading && (
        <div className="h-full w-full bg-spotify-background text-white">
          <Header className="h-[8%] absolute top-0  w-full overflow-hidden" />
          <div className="flex gap-8 w-full h-full pt-16 p-3 justify-center">
            {pathname !== '/orches/profile' && (
              <SideBar
                allRoutes={allRoutes}
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
              />
            )}
            <div className="flex rounded-lg shrink-0 p-4 w-4/6 h-full bg-container overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      )}
    </OrchesContext.Provider>
  )
}

export default OrchesAppWrapper
