'use server'
import type { AudioFeaturesObject } from '@/app/types/spotify/track'
import fetchFunction from '@/app/(apps)/orches/components/actions/helper/fetchFunction'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

interface ResFetchAudioFeatures {
  value: AudioFeaturesObject[] | []
  status: number
  error: string
}

export default async function fetchAudioFeatures(
  tracksToFetch: string[],
): Promise<NextResponse<ResFetchAudioFeatures>> {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return NextResponse.json({ value: [], status: 401, error: 'No session' })
  }
  const tracksString = 'ids=' + tracksToFetch.join(',')
  const url = `https://api.spotify.com/v1/audio-features?${tracksString}`
  const response = await fetchFunction({
    url,
    token: session?.user?.access_token,
  })
  console.log(response)
  return NextResponse.json({
    value: response.value,
    status: response.status,
    error: response.error,
  })
}
