import fetcher from './helper/fetchFunction'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
export default async function fetchTrackFeatures(
  accessToken: string,
  trackIds: string[],
  url: string,
): Promise<AudioFeaturesObject[]> {
  if (trackIds.length > 100) {
    throw new Error('Track limit exceeded (100 tracks)')
  }
  const ids = `ids=${trackIds.join(',')}`
  return fetcher({
    url,
    token: accessToken,
    body: ids,
  })
}
