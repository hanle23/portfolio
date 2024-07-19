import React from 'react'
import PlaylistHeader from './components/playlistHeader'
import PlaylistTrackItem from './components/playlistTrackItem'
import useDeletePlaylistItem from './actions/deletePlaylistItem'
import toast, { Toaster } from 'react-hot-toast'
import type {
  SimplifiedPlaylistObject,
  PlaylistTrackObject,
} from '@/app/types/spotify/playlist'

export default function PlaylistDetail({
  currPlaylist,
  setCurrPlaylist,
  trackAudio,
}: {
  currPlaylist: SimplifiedPlaylistObject
  setCurrPlaylist: (playlist: SimplifiedPlaylistObject | null) => void
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
}): React.JSX.Element {
  async function useHandleRemoveTrack(trackUri: string): Promise<void> {
    const res = await useDeletePlaylistItem(
      trackUri,
      currPlaylist.id,
      currPlaylist.snapshot_id,
    )
    if (res.status === 200) {
      toast.success(
        `Successfully removed track from playlist ${currPlaylist.name}`,
      )
    } else {
      toast.error(
        `Unable to remove track from playlist, please try again later`,
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-col overscroll-none overflow-y-auto">
      <PlaylistHeader
        playlist={currPlaylist}
        setCurrPlaylist={setCurrPlaylist}
      />

      <div className="flex flex-col w-full h-full px-2 mt-4 gap-3">
        {Array.isArray(currPlaylist?.tracks) &&
          currPlaylist?.tracks?.map(
            (track: PlaylistTrackObject, index: number) => (
              <PlaylistTrackItem
                key={track?.track?.id}
                handleRemoveTrack={useHandleRemoveTrack}
                index={index}
                track={track}
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
