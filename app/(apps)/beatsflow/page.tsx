'use client'
import React, { useState, useEffect, useContext } from 'react'
import { BeatsflowContext } from './components/appWrapper'
import PlaylistGrid from './components/playlist/playlistGrid'

export default function Page(): React.JSX.Element {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([])
  console.log('playlists', playlists)
  // const [savedTracks, setSavedTracks] = useState<TrackItem[]>([])
  const context = useContext(BeatsflowContext)
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

  // useEffect(() => {
  //   fetch('/api/spotify/savedTracks', {
  //     method: 'GET',
  //     headers: { Authorization: `Bearer ${context?.accessToken}` },
  //   })
  //     .then(async (response) => await response.json())
  //     .then((data: TrackItem[]) => {
  //       if (data.length !== 0) {
  //         setSavedTracks(data)
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [context?.accessToken])
  return (
    <>
      <div className="flex w-full h-full">
        <div className="flex gap-12 w-full ">
          <div className="flex rounded-lg bg-container h-3/4 w-1/4 shrink-0">
            <p>Place holder</p>
          </div>
          <PlaylistGrid
            className="flex rounded-lg shrink-0 p-2.5 w-3/5 h-3/4 overflow-auto bg-container"
            playlists={playlists}
          />
        </div>
      </div>
    </>
  )
}
