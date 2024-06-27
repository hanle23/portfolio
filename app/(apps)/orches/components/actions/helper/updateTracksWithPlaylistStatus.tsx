import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'

export default function updateTracksWithPlaylistStatus(
  playlists: SimplifiedPlaylistObject[],
  savedTracks: SavedTracks[],
): SavedTracks[] {
  // Create a Set of all track IDs in playlists for efficient lookup
  const playlistTrackIds = new Set(
    playlists?.flatMap((playlist) => {
      if (Array.isArray(playlist?.tracks)) {
        return playlist.tracks.map((item) => item?.track?.id)
      }
      return []
    }),
  )

  // Map over savedTracks to add isInPlaylist property
  const updatedSavedTracks = savedTracks.map((savedTrack: SavedTracks) => {
    const updatedItems = savedTrack?.items?.map((track) => {
      const isInPlaylist = playlistTrackIds.has(String(track?.track?.id))

      return {
        ...track,
        track: {
          ...track.track,
          isInPlaylist,
        },
      }
    })

    return {
      ...savedTrack,
      items: updatedItems,
    }
  })

  return updatedSavedTracks
}
