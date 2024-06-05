'use client'
import React, { useContext, useEffect } from 'react'
import { OrchesContext } from '../../../components/appWrapper'
import PlaylistHeader from './components/playlistHeader'
import PlaylistTrackItem from './components/playlistTrackItem'

import useFetchPlaylistDetails from './actions/fetchPlaylistDetails'
import useDeletePlaylistItem from './actions/deletePlaylistItem'
import toast, { Toaster } from 'react-hot-toast'

export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  const context = useContext(OrchesContext)
  const { data, setNextPage, isLoading, mutate, isValidating } =
    useFetchPlaylistDetails(context, playlist)
  const items = data?.flatMap((trackPage: Playlists) => trackPage.items) ?? []
  const trackAudio = context?.trackAudio

  async function useHandleRemoveTrack(trackUri: string): Promise<void> {
    const res = await useDeletePlaylistItem(
      context,
      trackUri,
      playlist.id,
      playlist.snapshot_id,
    )
    if (res.status === 200) {
      toast.success(`Successfully removed track from playlist ${playlist.name}`)
      mutate().catch((e) => {
        console.log(e)
      })
      mutate().catch((e) => {
        console.log(e)
      })
    } else {
      toast.error(
        `Unable to remove track from playlist, please try again later`,
      )
    }
  }

  useEffect(() => {
    if (!isLoading && !isValidating)
      setNextPage().catch((e) => {
        console.log(e)
      })
  }, [isLoading, setNextPage, isValidating])

  return (
    <div className="w-full h-full flex flex-col overscroll-none overflow-y-auto">
      <PlaylistHeader
        playlist={playlist}
        setCurrPlaylist={setCurrPlaylist}
        trackAudio={trackAudio}
      />

      <div className="flex flex-col w-full h-full px-2 mt-4 gap-3">
        {data !== undefined &&
          context !== null &&
          items.map((track: PlaylistTrackObject, index: number) => (
            <PlaylistTrackItem
              key={track?.track?.id}
              handleRemoveTrack={useHandleRemoveTrack}
              index={index}
              track={track}
              currentTrack={context?.currentTrack}
              setCurrentTrack={context?.setCurrentTrack}
              trackAudio={trackAudio}
            />
          ))}
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4500,
          style: {
            background: '#27272a',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}
