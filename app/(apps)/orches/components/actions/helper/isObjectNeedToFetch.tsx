import type { AudioFeaturesObject } from '@/app/types/spotify/track'
export default function IsObjectNeedToFetch(
  audioFeatures: Record<string, number | AudioFeaturesObject>,
): boolean {
  let result = false
  Object.keys(audioFeatures).forEach((trackId) => {
    if (audioFeatures[trackId] === 0) {
      result = true
    }
  })
  return result
}
