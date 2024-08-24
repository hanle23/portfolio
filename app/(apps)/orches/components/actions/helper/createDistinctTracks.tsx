import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'
import type { TrackPlaylists } from '@/app/types/spotify/track'
export const createDistinctTracks = (
  resItems: PlaylistTrackObject[],
  playlistId: string,
  distinctTracksInPlaylist: TrackPlaylists,
  setDistinctTracks: React.Dispatch<React.SetStateAction<TrackPlaylists>>,
): void => {
  const newState = distinctTracksInPlaylist

  resItems.forEach((item) => {
    const trackId = item?.track?.id
    if (trackId === null || trackId === undefined) {
      return
    }
    if (trackId in newState) {
      if (!newState[trackId].includes(playlistId)) {
        newState[trackId].push(playlistId)
      }
    } else {
      newState[trackId] = [playlistId]
    }
  })

  setDistinctTracks(newState)
}
