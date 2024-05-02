'use client'
import useSWR from 'swr'
import React, { useState, useContext } from 'react'
import { OrchesContext } from '../components/appWrapper'
import PlaylistGrid from './components/playlistGrid'
import PlaylistDetail from './components/playlistDetail/playlistDetail'

export default function PlaylistPage(): React.JSX.Element {
  const context = useContext(OrchesContext)
  const [currPlaylist, setCurrPlaylist] = useState<PlaylistItem | null>(null)
  const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  const { data: playlists, isLoading: playlistLoading } = useSWR<
    PlaylistItem[] | undefined
  >(
    fetcher !== null && context?.accessToken !== null
      ? `/api/spotify/playlists?username=${context?.profile?.display_name}`
      : null,
    fetcher,
  )

  // const [savedTracks, setSavedTracks] = useState<TrackItem[]>([])

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

  if (playlistLoading === true) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-full relative">
      {currPlaylist === null ? (
        <PlaylistGrid playlists={playlists} setCurrPlaylist={setCurrPlaylist} />
      ) : (
        <PlaylistDetail
          playlist={currPlaylist}
          setCurrPlaylist={setCurrPlaylist}
        />
      )}
    </div>
  )
}
