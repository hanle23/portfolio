'use server'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import fetchFunction from '@/app/(apps)/orches/components/actions/helper/fetchFunction'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

export default async function fetchAudioFeatures(
  tracksToFetch: string[],
): Promise<{ audio_features: AudioFeaturesObject[] }> {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return { audio_features: [] }
  }
  const tracksString = 'ids=' + tracksToFetch.join(',')
  const url = `https://api.spotify.com/v1/audio-features?${tracksString}`
  const response = await fetchFunction({
    url,
    token: session?.user?.access_token,
  })
  return response
}
