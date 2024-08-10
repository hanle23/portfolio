import type { AudioFeaturesObject } from '@/app/types/spotify/track'
import fetchAudioFeatures from './fetchAudioFeatures'
export default async function queueAudioFeatures(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
): Promise<Record<string, number | AudioFeaturesObject> | null> {
  const tracksToFetch: string[] = []
  let audioFeaturesChanged = false
  const newAudioFeatures = audioFeatures
  Object.keys(audioFeatures).forEach((trackId) => {
    if (audioFeatures[trackId] === 0 && tracksToFetch.length + 1 <= 100) {
      console.log('Adding track to fetch')
      tracksToFetch.push(trackId)
      newAudioFeatures[trackId] = 1
    }
  })
  if (tracksToFetch.length >= 1) {
    const fetchedAudioFeatures = await fetchAudioFeatures(tracksToFetch)
    const fetchedAudioFeaturesRes = await fetchedAudioFeatures.json()
    console.log('Fetched')
    console.log(fetchedAudioFeaturesRes)
    // fetchedAudioFeatures.forEach((audioFeature: AudioFeaturesObject) => {
    //   newAudioFeatures[audioFeature.id] = audioFeature
    // })
    audioFeaturesChanged = true
  }
  if (audioFeaturesChanged) {
    // setAudioFeatures(newAudioFeatures)
    return newAudioFeatures
  }
  return null
}
