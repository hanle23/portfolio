import React from 'react'
import PlaylistDetail from './components/playlistDetail/playlistDetail'
import SavedTracksDetail from './components/savedTracksDetail/savedTracksDetail'
import type {
  SimplifiedPlaylistObject,
  PlaylistSummary,
} from '@/app/types/spotify/playlist'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'

export default function PlaylistPage({
  currPlaylist,
  handleSetCurrPlaylist,
  trackAudio,
  savedTracksFunc,
  playlists,
}: {
  currPlaylist: SimplifiedPlaylistObject | null
  handleSetCurrPlaylist: (id: string | null) => void
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
  savedTracksFunc: {
    savedTracks: SavedTracks[] | undefined
    savedTracksSetNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    savedTracksMutate: () => void
    savedTracksIsValidating: boolean
  }
  playlists: PlaylistSummary[] | undefined | undefined
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
