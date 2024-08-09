import type { AudioFeaturesObject } from '@/app/types/spotify/track'
import fetchAudioFeatures from './fetchAudioFeatures'
export default async function queueAudioFeatures(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  setAudioFeatures: React.Dispatch<
    React.SetStateAction<Record<string, number | AudioFeaturesObject>>
  >,
): Promise<void> {
  const tracksToFetch: string[] = []
  let audioFeaturesChanged = false
  const newAudioFeatures = audioFeatures
  Object.keys(audioFeatures).forEach((trackId) => {
    if (audioFeatures[trackId] === 0 && tracksToFetch.length + 1 <= 100) {
      tracksToFetch.push(trackId)
      newAudioFeatures[trackId] = 1
      audioFeaturesChanged = true
    }
  })
  if (tracksToFetch.length >= 1) {
    const fetchedAudioFeatures = await fetchAudioFeatures(tracksToFetch)
    fetchedAudioFeatures.forEach((audioFeature: AudioFeaturesObject) => {
      newAudioFeatures[audioFeature.id] = audioFeature
    })
  }
  if (audioFeaturesChanged) {
    setAudioFeatures(newAudioFeatures)
  }
}
