import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
export default function NumOfObjectNeedToFetch(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
): number {
  let result = 0
  Object.keys(audioFeatures).forEach((trackId) => {
    if (audioFeatures[trackId] === 0) {
      result += 1
    }
  })
  return result
}
