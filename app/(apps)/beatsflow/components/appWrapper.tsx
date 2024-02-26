'use client'
import React, { createContext, useState, useEffect } from 'react'
import { NextUIWrapper } from '@/app/components/nextUIWrapper'
import { redirectToAuthCodeFlow } from '@/utils/spotify/script'
import { getLocalStorageItem } from '@/utils/LocalStorage'

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
  let code: string | null = null
  if (typeof window !== 'undefined') {
    code = new URLSearchParams(window.location.search).get('code')
  }
  const context = {
    accessToken,
  }

  useEffect(() => {
    if (accessToken === null && code !== null) {
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
          granType: 'authorization_code',
        }),
      })
        .then(async (response) => await response.json())
        .then((data: AccessTokenSuccessData) => {
          if ('access_token' in data && accessToken === null) {
            setAccessToken(data.access_token)
          }
        })
        .catch((error) => {
          console.error(error.message)
        })
    }
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
        {accessToken === null ? (
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
