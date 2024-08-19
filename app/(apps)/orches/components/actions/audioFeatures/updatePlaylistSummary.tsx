import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { TrackPlaylists } from '@/app/types/spotify/track'
import type {
  PlaylistSummary,
  SimplifiedPlaylistObject,
} from '@/app/types/spotify/playlist'

export default function updatePlaylistSummary(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  distinctTracksInPlaylist: TrackPlaylists,
  distinctPlaylist: PlaylistSummary[],
  playlist?: SimplifiedPlaylistObject,
): PlaylistSummary[] | null {
  let fullfilledRequirements = true
  Object.keys(distinctTracksInPlaylist).some((trackId: string) => {
    if (!(trackId in audioFeatures)) {
      fullfilledRequirements = false
      return true
    }
    return false
  })
  if (!fullfilledRequirements) {
    return null
  }
  let newPlaylistSummary
  if (playlist !== null && playlist !== undefined) {
    newPlaylistSummary = {
      id: playlist.id,
      name: playlist.name,
      images: playlist.images,
      numOfTracks: Array.isArray(playlist?.tracks)
        ? playlist.tracks.length
        : playlist.tracks.total,
      description: playlist.description,
      snapshot_id: playlist.snapshot_id,
      tracksFeatures: null,
    }
  }
  let newDistinctPlaylist: PlaylistSummary[] = []
  if (newPlaylistSummary === null || newPlaylistSummary === undefined) {
    newDistinctPlaylist = distinctPlaylist ?? []
  } else {
    newDistinctPlaylist =
      distinctPlaylist?.length > 0
        ? [...distinctPlaylist, newPlaylistSummary]
        : [newPlaylistSummary]
  }

  if (newDistinctPlaylist.length === 0) {
    return null
  }

  for (let i = 0; i < newDistinctPlaylist.length; i++) {
    if (
      newDistinctPlaylist[i].tracksFeatures !== undefined &&
      newDistinctPlaylist[i].tracksFeatures !== null &&
      newDistinctPlaylist[i]?.tracksFeatures?.length ===
        newDistinctPlaylist[i].numOfTracks
    ) {
      continue
    }
    const playlistId = newDistinctPlaylist[i].id
    const newTracksFeatures: AudioFeaturesObject[] =
      newDistinctPlaylist[i].tracksFeatures ?? []
    Object.keys(distinctTracksInPlaylist).forEach((trackId: string) => {
      if (
        distinctTracksInPlaylist[trackId].includes(playlistId) &&
        !newTracksFeatures.some(
          (audioFeaturesObject) => audioFeaturesObject.id === trackId,
        )
      ) {
        const audioFeature = audioFeatures[trackId]
        if (audioFeature !== undefined && audioFeature instanceof Object) {
          newTracksFeatures.push(audioFeature)
        }
      }
    })
    newDistinctPlaylist[i].tracksFeatures = newTracksFeatures
  }
  return newDistinctPlaylist
}
