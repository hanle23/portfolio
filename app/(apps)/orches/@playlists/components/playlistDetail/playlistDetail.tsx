'use client'
import React, { useContext } from 'react'
import { OrchesContext } from '../../../components/orchesAppWrapper'
import PlaylistHeader from './components/playlistHeader'
import PlaylistTrackItem from './components/playlistTrackItem'
import useDeletePlaylistItem from './actions/deletePlaylistItem'
import toast, { Toaster } from 'react-hot-toast'
import type {
  SimplifiedPlaylistObject,
  PlaylistTrackObject,
} from '@/app/types/spotify/playlist'

export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: SimplifiedPlaylistObject
  setCurrPlaylist: React.Dispatch<
    React.SetStateAction<SimplifiedPlaylistObject | null>
  >
}): React.JSX.Element {
  const context = useContext(OrchesContext)
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
    } else {
      toast.error(
        `Unable to remove track from playlist, please try again later`,
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-col overscroll-none overflow-y-auto">
      <PlaylistHeader
        playlist={playlist}
        setCurrPlaylist={setCurrPlaylist}
        trackAudio={trackAudio}
      />

      <div className="flex flex-col w-full h-full px-2 mt-4 gap-3">
        {Array.isArray(context?.currPlaylist?.tracks) &&
          context?.currPlaylist?.tracks?.map(
            (track: PlaylistTrackObject, index: number) => (
              <PlaylistTrackItem
                key={track?.track?.id}
                handleRemoveTrack={useHandleRemoveTrack}
                index={index}
                track={track}
                currentTrack={context?.currentTrack}
                setCurrentTrack={context?.setCurrentTrack}
                trackAudio={trackAudio}
              />
            ),
          )}
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
