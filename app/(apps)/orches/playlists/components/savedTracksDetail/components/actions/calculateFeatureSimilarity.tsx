import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { PlaylistSummary } from '@/app/types/spotify/playlist'
import getFeatureRange from './getFeatureRange'
import getSimilarityPercentage from './getSimilarityPercentage'
import {
  FEATURE_NAMES,
  FEATURE_SETTINGS,
} from '@/constants/spotify/audioFeatures'

function shouldIncludeFeature(featureName: string, filter?: string[]): boolean {
  return filter === undefined || filter.includes(featureName)
}

export default function calculateFeatureSimilarity(
  playlist: PlaylistSummary,
  targetTrackFeature: AudioFeaturesObject | number,
  filter?: string[],
): number {
  if (targetTrackFeature === undefined) {
    return 0
  }
  if (typeof targetTrackFeature === 'number') {
    return 0
  }
  let totalSimilarity = 0
  let includedFeatureCount = 0

  for (const featureName of FEATURE_NAMES) {
    if (shouldIncludeFeature(featureName, filter)) {
      const featureArray = getFeatureRange(playlist, featureName)
      let targetFeatureValue = targetTrackFeature[featureName]
      if (typeof targetFeatureValue !== 'number') {
        targetFeatureValue = parseFloat(targetFeatureValue)
      }
      const similarityPercentage = getSimilarityPercentage(
        featureArray,
        targetFeatureValue,
        FEATURE_SETTINGS[featureName],
      )
      totalSimilarity += similarityPercentage
      includedFeatureCount++
    }
  }

  return includedFeatureCount > 0 ? totalSimilarity / includedFeatureCount : 0
}
