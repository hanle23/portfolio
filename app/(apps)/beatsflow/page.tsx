import React from 'react'
import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchProfile,
} from 'utils/spotify/script'
import Image from 'next/image'

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}): Promise<React.JSX.Element> {
  let accessToken: string | null = null
  let profile: UserProfile | null = null
  let code: string | null = null
  const clientID = process.env.SPOTIFY_CLIENT_ID
  // const searchParams = new URLSearchParams(window.location.search)
  if (searchParams !== undefined) {
    code = searchParams.get('code')
  }

  if (code !== null) {
    accessToken = await getAccessToken(clientID, code)
    profile = await fetchProfile(accessToken)
  }

  const handlerAuthorization: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault()
    redirectToAuthCodeFlow(clientID).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="grid content-center justify-items-center gap-y-10 w-full h-full ">
      {code === null && (
        <div>
          <button
            onClick={handlerAuthorization}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Login with Spotify
          </button>
        </div>
      )}
      {profile === null && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {profile !== null && (
        <div>
          <h1>{profile.display_name}</h1>
          <Image src={profile.images[0].url} alt={profile.display_name} />
        </div>
      )}
    </div>
  )
}
