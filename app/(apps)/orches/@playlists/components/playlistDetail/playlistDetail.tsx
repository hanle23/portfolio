'use client'
import React, { useContext, useEffect, useRef } from 'react'
import PlaylistHeader from './playlistHeader'
import { OrchesContext } from '../../../components/appWrapper'
import useFetchPlaylistDetails from './actions/fetchPlaylistDetails'
import useDeletePlaylistItem from './actions/deletePlaylistItem'
import TrackItem from './trackItem'
import toast, { Toaster } from 'react-hot-toast'

export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
  playlistMutate,
}: {
  playlist: PlaylistItem
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
  playlistMutate: () => Promise<PlaylistItem[] | undefined>
}): React.JSX.Element {
  const context = useContext(OrchesContext)
  const { data, size, setNextPage, isLoading, mutate } =
    useFetchPlaylistDetails(context, playlist)
  const items = data?.flatMap((trackPage: Playlists) => trackPage.items) ?? []
  const scrollableElementRef = useRef(null)

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
      playlistMutate().catch((e) => {
        console.log(e)
      })
    } else {
      toast.error(
        `Unable to remove track from playlist, please try again later`,
      )
    }
  }

  useEffect(() => {
    if (!isLoading)
      setNextPage().catch((e) => {
        console.log(e)
      })
  }, [data, isLoading, setNextPage, size])

  return (
    <div
      ref={scrollableElementRef}
      className="w-full h-full flex flex-col overflow-y-auto"
    >
      <PlaylistHeader
        scrollableElementRef={scrollableElementRef}
        playlist={playlist}
        setCurrPlaylist={setCurrPlaylist}
      />

      <div className="flex flex-col w-full h-full px-2 mt-4 gap-3">
        {data !== undefined &&
          context !== null &&
          items.map((track: PlaylistTrackObject, index: number) => (
            <TrackItem
              key={track?.track?.id}
              handleRemoveTrack={useHandleRemoveTrack}
              index={index}
              track={track}
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
