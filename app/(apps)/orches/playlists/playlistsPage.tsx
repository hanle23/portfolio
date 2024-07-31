import PlaylistDetail from './components/playlistDetail/playlistDetail'
import SavedTracksDetail from './components/savedTracksDetail/savedTracksDetail'
import type {
  SimplifiedPlaylistObject,
  PlaylistSummary,
  PlaylistResponse,
} from '@/app/types/spotify/playlist'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'

export default function PlaylistPage({
  currPlaylist,
  handleSetCurrPlaylist,
  savedTracksFunc,
  playlists,
  distinctTracksInPlaylist,
  playlistsMutate,
  trackUrl,
  setTrackUrl,
}: {
  currPlaylist: SimplifiedPlaylistObject | null
  handleSetCurrPlaylist: (id: string | null) => void
  savedTracksFunc: {
    savedTracks: SavedTracks[] | undefined
    savedTracksSetNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    savedTracksMutate: () => void
    savedTracksIsValidating: boolean
  }
  playlists: PlaylistSummary[] | undefined | undefined
  distinctTracksInPlaylist: Record<string, string[]>
  playlistsMutate: () => Promise<PlaylistResponse[] | undefined>
  trackUrl: string
  setTrackUrl: (url: string) => void
}): JSX.Element {
  return (
    <div className="w-full h-full relative">
      {currPlaylist !== undefined && currPlaylist !== null ? (
        <PlaylistDetail
          currPlaylist={currPlaylist}
          setCurrPlaylist={handleSetCurrPlaylist}
          playlistsMutate={playlistsMutate}
          trackUrl={trackUrl}
          setTrackUrl={setTrackUrl}
        />
      ) : (
        <SavedTracksDetail
          savedTracksFunc={savedTracksFunc}
          playlists={playlists}
          distinctTracksInPlaylist={distinctTracksInPlaylist}
          playlistsMutate={playlistsMutate}
          trackUrl={trackUrl}
          setTrackUrl={setTrackUrl}
        />
      )}
    </div>
  )
}
