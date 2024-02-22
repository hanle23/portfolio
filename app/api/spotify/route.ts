import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<{ data: UserProfile }>> {
  const res = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const profile = await res.json()

  return NextResponse.json({ data: profile })
}
