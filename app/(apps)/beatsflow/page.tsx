'use client'
import React, { useState, useEffect, useContext } from 'react'
import { BeatsflowContext } from './components/appWrapper'

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
      <div className="grid w-2/6 h-3/5 gap-2 border grid-flow-col auto-cols-max">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            style={{
              backgroundImage: `url(${playlist.images[0].url})`,
              backgroundSize: 'cover',
            }}
            className="border h-fit min-w-2/4"
          >
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <p>Tracks: {playlist.tracks.total}</p>
          </div>
        ))}
      </div>
    </>
  )
}
