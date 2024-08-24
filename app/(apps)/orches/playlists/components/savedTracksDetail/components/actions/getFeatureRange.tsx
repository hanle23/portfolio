import type { PlaylistSummary } from '@/app/types/spotify/playlist'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import { FEATURE_SETTINGS } from '@/constants/spotify/audioFeatures'
type AudioFeatureType = keyof AudioFeaturesObject

export default function getFeatureRange(
  playlist: PlaylistSummary,
  type: AudioFeatureType,
): number[][] | null {
  const audioFeatures = playlist.tracksFeatures
  if (audioFeatures === null || audioFeatures === undefined) {
    return null
  }
  const max = FEATURE_SETTINGS[type]?.max ?? 0
  const min = FEATURE_SETTINGS[type]?.min ?? 0
  const factorOfMargin = FEATURE_SETTINGS[type]?.factorOfMargin ?? 1
  const errorMargin = factorOfMargin !== 1 ? (max - min) / factorOfMargin : 0
  const resultArray: number[][] = []
  for (let outerIndex = 0; outerIndex < audioFeatures.length; outerIndex++) {
    const lowerRange = (audioFeatures[outerIndex][type] as number) - errorMargin
    const upperRange = (audioFeatures[outerIndex][type] as number) + errorMargin
    if (resultArray.length < 1) {
      resultArray.push([lowerRange, upperRange])
    } else {
      let index = 0
      while (index < resultArray.length) {
        const itemLowerRange = resultArray[index][0]
        const itemUpperRange = resultArray[index][1]
        if (upperRange < itemLowerRange) {
          resultArray.splice(index, 0, [lowerRange, upperRange])
          break
        } else if (lowerRange > itemUpperRange) {
          if (index + 1 < resultArray.length) {
            index += 1
            continue
          }
          resultArray.splice(index + 1, 0, [lowerRange, upperRange])
          break
        } else if (lowerRange === itemLowerRange) {
          resultArray[index] = [
            lowerRange,
            Math.max(itemUpperRange, upperRange),
          ]
          break
        } else if (upperRange === itemUpperRange) {
          resultArray[index] = [
            Math.min(itemLowerRange, lowerRange),
            itemUpperRange,
          ]
          break
        } else {
          if (lowerRange < itemLowerRange) {
            resultArray[index] = [lowerRange, resultArray[index][1]]
            break
          } else if (upperRange > itemUpperRange) {
            resultArray[index] = [resultArray[index][0], upperRange]
            break
          }
        }
        index++
      }
    }
  }
  return resultArray
}
