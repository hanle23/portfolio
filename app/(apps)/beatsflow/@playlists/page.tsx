// 'use client'
// import useSWR from 'swr'
// import React, { useState, useContext } from 'react'
// import { BeatsflowContext } from '../components/appWrapper'
// import PlaylistGrid from '../components/playlist/playlistGrid'

export default function PlaylistPage(): React.JSX.Element {
  console.log('PlaylistPage')
  // const context = useContext(BeatsflowContext)
  // const [currPlaylist, setCurrPlaylist] = useState<PlaylistItem | null>(null)
  // const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  // const { data: playlists, isLoading: playlistLoading } = useSWR<
  //   PlaylistItem[] | undefined
  // >(
  //   fetcher !== null && context?.accessToken !== null
  //     ? `/api/spotify/playlists?username=${context?.profile?.display_name}`
  //     : null,
  //   fetcher,
  // )

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
  return (
    <div className="flex rounded-lg shrink-0 p-4 w-4/6 h-full overflow-auto bg-container">
      <p className="text-white">Playlist Page</p>
      {/* {playlistLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <PlaylistGrid playlists={playlists} setCurrPlaylist={setCurrPlaylist} />
      )} */}
    </div>
  )
}
