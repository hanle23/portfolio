import type {
  SavedTracks,
  DetailsPlaylistItem,
  TrackDetail,
} from '@/app/types/types'

export default function updateTracksWithPlaylistStatus(
  playlists: SavedTracks[],
  savedTracks: DetailsPlaylistItem[],
): DetailsPlaylistItem[] {
  // Create a Set of all track IDs in playlists for efficient lookup
  const playlistTrackIds = new Set(
    playlists.flatMap((playlist) =>
      playlist.items.map((item) => item.track.id),
    ),
  )

  // Map over savedTracks to add isInPlaylist property
  const updatedSavedTracks = savedTracks.map((savedTrack) => {
    // Check if any of the tracks in the savedTrack.tracks array is in the playlist
    const isInPlaylist = savedTrack?.tracks?.some((track: TrackDetail) =>
      playlistTrackIds.has(String(track?.id)),
    )

    return {
      ...savedTrack,
      isInPlaylist,
    }
  })

  //   return updatedSavedTracks
}
