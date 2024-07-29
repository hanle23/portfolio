import React from 'react'
import PlaylistHeader from './components/playlistHeader'
import PlaylistTrackItem from './components/playlistTrackItem'
import deletePlaylistItem from '../actions/deletePlaylistItem'
import toast, { Toaster } from 'react-hot-toast'
import type {
  SimplifiedPlaylistObject,
  PlaylistTrackObject,
} from '@/app/types/spotify/playlist'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function PlaylistDetail({
  currPlaylist,
  setCurrPlaylist,
  trackAudio,
}: {
  currPlaylist: SimplifiedPlaylistObject
  setCurrPlaylist: (id: string | null) => void
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
}): React.JSX.Element {
  async function useHandleRemoveTrack(trackUri: string): Promise<void> {
    const res = await deletePlaylistItem(
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

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties | undefined
  }): JSX.Element | null => {
    if (Array.isArray(currPlaylist?.tracks)) {
      return (
        <PlaylistTrackItem
          key={`${currPlaylist.id} ${currPlaylist?.tracks[index].track?.id}`}
          handleRemoveTrack={useHandleRemoveTrack}
          index={index}
          track={currPlaylist?.tracks[index]}
          trackAudio={trackAudio}
          style={style}
        />
      )
    } else return null
  }

  return (
    <div className="w-full h-full flex flex-col overscroll-none overflow-y-auto">
      <PlaylistHeader
        playlist={currPlaylist}
        setCurrPlaylist={setCurrPlaylist}
      />

      <div className="flex flex-col w-full h-full px-2 mt-4 gap-3">
        {Array.isArray(currPlaylist?.tracks) ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={
                  (currPlaylist?.tracks as PlaylistTrackObject[]).length
                }
                itemSize={() => 60}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        ) : (
          <></>
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
