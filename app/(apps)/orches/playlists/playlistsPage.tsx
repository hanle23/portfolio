import React from 'react'
import PlaylistDetail from './components/playlistDetail/playlistDetail'
import SavedTracksDetail from './components/savedTracksDetail/savedTracksDetail'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'

export default function PlaylistPage({
  currPlaylist,
  handleSetCurrPlaylist,
  trackAudio,
}: {
  currPlaylist: SimplifiedPlaylistObject | null
  handleSetCurrPlaylist: (playlist: SimplifiedPlaylistObject | null) => void
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
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
        <SavedTracksDetail trackAudio={trackAudio} />
      )}
    </div>
  )
}
