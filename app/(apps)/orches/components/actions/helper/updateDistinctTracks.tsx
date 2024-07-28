import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'
import type { TrackPlaylists } from '@/app/types/spotify/track'
export const updateDistinctTracks = (
  resItems: PlaylistTrackObject[],
  playlistId: string,
  setDistinctTracks: React.Dispatch<React.SetStateAction<TrackPlaylists>>,
): void => {
  setDistinctTracks((prevTracks) => {
    const newState = { ...prevTracks }

    resItems.forEach((item) => {
      const trackId = item?.track?.uri

      if (trackId in newState) {
        if (!newState[trackId].includes(playlistId)) {
          newState[trackId].push(playlistId)
        }
      } else {
        newState[trackId] = [playlistId]
      }
    })

    return newState
  })
}
