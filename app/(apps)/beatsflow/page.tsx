'use client'
import React, { useState, useEffect, useContext } from 'react'
import { BeatsflowContext } from './components/appWrapper'

export default function Page(): React.JSX.Element {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([])
  const context = useContext(BeatsflowContext)
  console.log(playlists)
  useEffect(() => {
    fetch(`/api/spotify/playlists?username=${context?.profile?.display_name}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${context?.accessToken}` },
    })
      .then(async (response) => await response.json())
      .then((data: PlaylistItem[]) => {
        if (data.length !== 0) {
          setPlaylists(data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [context?.accessToken, context?.profile?.display_name])
  return (
    <div className="flex content-center justify-items-center gap-y-10 w-full h-full "></div>
  )
}
