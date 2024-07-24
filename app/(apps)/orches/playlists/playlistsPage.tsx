import React from 'react'
import PlaylistDetail from './components/playlistDetail/playlistDetail'
import SavedTracksDetail from './components/savedTracksDetail/savedTracksDetail'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'

export default function PlaylistPage({
  currPlaylist,
  handleSetCurrPlaylist,
  trackAudio,
  savedTracksFunc,
  playlists,
}: {
  currPlaylist: SimplifiedPlaylistObject | null
  handleSetCurrPlaylist: (playlist: SimplifiedPlaylistObject | null) => void
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
  savedTracksFunc: {
    savedTracks: SavedTracks[] | undefined
    savedTracksSetNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    savedTracksMutate: () => void
    savedTracksIsValidating: boolean
  }
  playlists:
    | Array<{
        name: string
        id: string
        images: Array<{
          url: string
          height: number | null
          width: number | null
        }>
      }>
    | undefined
    | undefined
}): React.JSX.Element {
  return (
    <div className="w-full h-full relative">
      {currPlaylist !== undefined && currPlaylist !== null ? (
        <PlaylistDetail
          currPlaylist={currPlaylist}
          setCurrPlaylist={handleSetCurrPlaylist}
          trackAudio={trackAudio}
        />
      ) : (
        <SavedTracksDetail
          trackAudio={trackAudio}
          savedTracksFunc={savedTracksFunc}
          playlists={playlists}
        />
      )}
    </div>
  )
}
