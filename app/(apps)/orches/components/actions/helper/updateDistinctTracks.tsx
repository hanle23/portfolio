import type { TrackPlaylists } from '@/app/types/spotify/track'
export default function updateDistinctTracks(
  trackId: string,
  playlistsToAdd: string[],
  playlistsToRemove: string[],
  distinctTracksInPlaylist: Record<string, string[]>,
  setDistinctTracksInPlaylist: React.Dispatch<
    React.SetStateAction<TrackPlaylists>
  >,
): void {
  const newState = distinctTracksInPlaylist
  if (playlistsToAdd.length > 0) {
    playlistsToAdd.forEach((playlistId) => {
      if (trackId in newState) {
        if (!newState[trackId].includes(playlistId)) {
          newState[trackId].push(playlistId)
        }
      } else {
        newState[trackId] = [playlistId]
      }
    })
  }

  if (playlistsToRemove.length > 0) {
    playlistsToRemove.forEach((playlistId) => {
      if (trackId in newState) {
        newState[trackId] = newState[trackId].filter((id) => id !== playlistId)
      }
    })
  }

  setDistinctTracksInPlaylist(newState)
}
