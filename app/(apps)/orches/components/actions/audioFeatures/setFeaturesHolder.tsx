import type { AudioFeaturesObject } from '@/app/types/spotify/track'
import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'
import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
export default function setFeaturesHolder(
  trackArray: PlaylistTrackObject[] | SavedTracksObject[],
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  setAudioFeatures: (
    value: Record<string, number | AudioFeaturesObject>,
  ) => void,
): void {
  const newAudioFeatures = audioFeatures

  trackArray.forEach((track) => {
    const trackId = track?.track?.id
    if (trackId === undefined || trackId === null) {
      return
    }
    if (!(trackId in newAudioFeatures)) {
      newAudioFeatures[trackId] = 0
    }
  })
  setAudioFeatures(newAudioFeatures)
}
