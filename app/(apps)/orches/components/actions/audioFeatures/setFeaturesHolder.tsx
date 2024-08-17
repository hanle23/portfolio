import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'
import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import throttledFetchAudioFeatures from './throttledFetchAudioFeatures'
export default async function setAudioFeatures(
  trackArray: PlaylistTrackObject[] | SavedTracksObject[],
  audioFeatures: Record<string, number | AudioFeaturesObject>,
): Promise<Record<string, number | AudioFeaturesObject> | undefined> {
  try {
    let newAudioFeatures = audioFeatures

    trackArray.forEach((track) => {
      const trackId = track?.track?.id
      if (trackId === undefined || trackId === null) {
        return
      }
      if (!(trackId in newAudioFeatures)) {
        newAudioFeatures[trackId] = 0
      }
    })
    newAudioFeatures = await throttledFetchAudioFeatures(newAudioFeatures)
    return newAudioFeatures
  } catch (error) {
    console.log(error)
  }
}
