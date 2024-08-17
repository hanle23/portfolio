import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { TrackPlaylists } from '@/app/types/spotify/track'
import type { PlaylistSummary } from '@/app/types/spotify/playlist'

export default function updatePlaylistSummary(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  distinctTracksInPlaylist: TrackPlaylists,
  distinctPlaylist: PlaylistSummary[],
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
  const newDistinctPlaylist = distinctPlaylist
  for (let i = 0; i < distinctPlaylist.length; i++) {
    if (
      newDistinctPlaylist[i].tracksFeatures !== undefined &&
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
