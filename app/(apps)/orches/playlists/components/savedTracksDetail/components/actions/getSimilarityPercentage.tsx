import getMinDistance from './getMinDistance'
import { percentPerErrMargin } from '@/constants/spotify/audioFeatures'
export default function getSimilarityPercentage(
  featureArray: number[][] | null,
  target: number,
  featureSetting: {
    min: number
    max: number
    factorOfMargin: number | null
  } | null,
): number {
  // In case that the featureArray is failed to initialize, similarity percentage will be 0
  if (featureArray === null || featureSetting === null) {
    return 0
  }

  const minDistance = getMinDistance(featureArray, target)
  const factorOfMargin = featureSetting.factorOfMargin ?? 1
  if (factorOfMargin === 1 && minDistance !== 0) {
    return 0
  }
  const errorMargin = (featureSetting.max - featureSetting.min) / factorOfMargin
  const similarityDistance = (minDistance * percentPerErrMargin) / errorMargin
  if (similarityDistance > 100) {
    return 0
  } else {
    return 100 - similarityDistance
  }
}
