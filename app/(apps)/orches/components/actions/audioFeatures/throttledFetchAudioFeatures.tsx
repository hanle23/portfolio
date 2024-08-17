import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import IsObjectNeedToFetch from './isObjectNeedToFetch'
import queueAudioFeatures from './queueAudioFeatures'
import { throttle } from 'lodash'

const throttledFetchAudioFeatures = async (
  audioFeatures: Record<string, number | AudioFeaturesObject>,
): Promise<Record<string, number | AudioFeaturesObject>> => {
  const fetchData = async (): Promise<
    Record<string, number | AudioFeaturesObject>
  > => {
    let newAudioFeatures = audioFeatures
    if (audioFeatures !== null && audioFeatures !== undefined) {
      while (IsObjectNeedToFetch(audioFeatures)) {
        const res = await queueAudioFeatures(audioFeatures)
        if (res === null) {
          break
        }
        newAudioFeatures = res
      }
    }
    return newAudioFeatures
  }
  const throttledFetchFn = throttle(fetchData, 1000, {
    leading: true,
    trailing: false,
  })
  return await new Promise((resolve, reject) => {
    throttledFetchFn().then(resolve).catch(reject)
  })
}
export default throttledFetchAudioFeatures
