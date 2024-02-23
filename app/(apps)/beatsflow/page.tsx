'use client'
import React, { useEffect, useState } from 'react'
import { redirectToAuthCodeFlow } from '@/utils/spotify/script'

import Image from 'next/image'

export default function Page(): React.JSX.Element {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  useEffect(() => {
    async function fetchUserProfile(code: string | null): Promise<void> {
      if (code !== null) {
        const accessToken = await fetch('/api/spotify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })
        const accessTokenString = JSON.stringify(accessToken)
        const response = await fetch('/api/spotify', {
          headers: { Authorization: `Bearer ${accessTokenString}` },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }

        const { data } = await response.json()
        return data
      }
    }
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const code = searchParams.get('code')
      if (code !== null) {
        fetchUserProfile(code)
          .then((profile) => {
            if (profile !== undefined) {
              setProfile(profile)
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }, [])

  const handlerAuthorization: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    redirectToAuthCodeFlow().catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="grid content-center justify-items-center gap-y-10 w-full h-full ">
      {profile === null && (
        <div>
          <button
            onClick={handlerAuthorization}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Login with Spotify
          </button>
        </div>
      )}
      {profile !== null && (
        <div>
          <h1>{profile.display_name}</h1>
          <Image
            src={profile.images[0].url}
            alt={profile.display_name}
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  )
}
