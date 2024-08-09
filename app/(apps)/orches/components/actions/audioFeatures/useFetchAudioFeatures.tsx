'use server'
import type { AudioFeaturesObject } from '@/app/types/spotify/track'
import fetchFunction from '@/app/(apps)/orches/components/actions/helper/fetchFunction'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

export default async function fetchAudioFeatures(
  tracksToFetch: string[],
): Promise<AudioFeaturesObject[]> {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return NextResponse.json({
      message: 'User not authorized to use this action',
      status: 401,
    })
  }
  const tracksString = 'ids=' + tracksToFetch.join(',')
  const url = `https://api.spotify.com/v1/audio-features?${tracksString}`
  const response = await fetchFunction({ url, token:session?.user?.access_token} })
}
