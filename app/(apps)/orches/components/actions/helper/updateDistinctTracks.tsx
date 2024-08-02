import type {
  PlaylistResponse,
  SimplifiedPlaylistObject,
  PlaylistTrackObject,
} from '@/app/types/spotify/playlist'
import type { TrackPlaylists } from '@/app/types/spotify/track'
export const updateDistinctTracks = (
  playlists: PlaylistResponse[],
  distinctTracksInPlaylist: TrackPlaylists,
): TrackPlaylists | null => {
  const newDistinctTracksInPlaylist = distinctTracksInPlaylist
  const allPlaylists = playlists.flatMap((playlist) => playlist.items)

  allPlaylists.forEach((playlist: SimplifiedPlaylistObject) => {
    const playlistId = playlist.id
    const resItems = playlist.tracks as PlaylistTrackObject[]
    if (!Array.isArray(resItems)) {
      return null
    }
    resItems.forEach((item) => {
      const trackId = item?.track?.id
      if (trackId === null || trackId === undefined) {
        return
      }
      if (trackId in newDistinctTracksInPlaylist) {
        if (!newDistinctTracksInPlaylist[trackId].includes(playlistId)) {
          newDistinctTracksInPlaylist[trackId].push(playlistId)
        }
      } else {
        newDistinctTracksInPlaylist[trackId] = [playlistId]
      }
    })
  })
  return newDistinctTracksInPlaylist
}
