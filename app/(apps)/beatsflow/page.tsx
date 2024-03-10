'use client'
import useSWR from 'swr'
import React, { useState, useContext } from 'react'
import { BeatsflowContext } from './components/appWrapper'
import PlaylistGrid from './components/playlist/playlistGrid'

export default function Page(): React.JSX.Element {
  const context = useContext(BeatsflowContext)
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
  console.log(currPlaylist)
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
    <>
      <div className="flex gap-8 w-full h-[92%] p-3 justify-center">
        <div className="flex flex-col gap-6 w-1/4 h-full shrink-0">
          <div className="flex rounded-lg h-1/6 bg-container"></div>
          <div className="flex rounded-lg bg-container h-4/5 p-2.5">
            <p className="font-bold text-lg">Liked Songs</p>
          </div>
        </div>
        <div className="flex rounded-lg shrink-0 p-4 w-4/6 h-full overflow-auto bg-container">
          {playlistLoading ? (
            <div>Loading...</div>
          ) : (
            <PlaylistGrid
              playlists={playlists}
              setCurrPlaylist={setCurrPlaylist}
            />
          )}
        </div>
      </div>
    </>
  )
}
