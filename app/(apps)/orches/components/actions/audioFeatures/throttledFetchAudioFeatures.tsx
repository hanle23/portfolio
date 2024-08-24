import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import NumOfObjectNeedToFetch from './numOfObjectNeedToFetch'
import queueAudioFeatures from './queueAudioFeatures'
import { throttle } from 'lodash'

const throttledFetchAudioFeatures = async (
  audioFeatures: Record<string, number | AudioFeaturesObject>,
  currPageIndex: number,
  totalPage: number,
): Promise<Record<string, number | AudioFeaturesObject> | null> => {
  const fetchData = async (): Promise<Record<
    string,
    number | AudioFeaturesObject
  > | null> => {
    let newAudioFeatures = audioFeatures
    if (audioFeatures !== null && audioFeatures !== undefined) {
      const numOfObject = NumOfObjectNeedToFetch(audioFeatures)
      if (numOfObject < 75 && currPageIndex !== totalPage) {
        return null
      }
      let current = 0
      while (current < numOfObject) {
        const res = await queueAudioFeatures(audioFeatures)
        if (res === null) {
          break
        }
        newAudioFeatures = res.data
        current += res.total
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
