'use client'
import React, { useContext, useEffect } from 'react'
import PlaylistHeader from './playlistHeader'
import { OrchesContext } from '../../../components/appWrapper'
import useFetchPlaylistDetails from './actions/fetchPlaylistDetails'
import TrackItem from './trackItem'

export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  const context = useContext(OrchesContext)
  const { data, size, setNextPage, isLoading } = useFetchPlaylistDetails(
    context,
    playlist,
  )
  const items = data?.flatMap((trackPage: Playlists) => trackPage.items) ?? []

  useEffect(() => {
    if (!isLoading)
      setNextPage().catch((e) => {
        console.log(e)
      })
  }, [data, isLoading, setNextPage, size])

  console.log(data, size)

  return (
    <div className="relative w-full h-full flex flex-col overflow-y-auto">
      <PlaylistHeader playlist={playlist} setCurrPlaylist={setCurrPlaylist} />

      <div className="flex flex-col w-full h-full px-2 mt-4 gap-3">
        {data !== undefined &&
          items.map((track: PlaylistTrackObject, index: number) => (
            <TrackItem key={track?.track?.id} index={index} track={track} />
          ))}
      </div>
    </div>
  )
}
