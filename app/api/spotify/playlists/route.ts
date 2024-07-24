import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { BASE_URL } from '@/constants/spotify/playlist'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const offset = req.nextUrl.searchParams.get('offset')
  const limit = req.nextUrl.searchParams.get('limit')

  let response
  try {
    response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: { Authorization: `${authHeader}` },
    })
    response = await response.json()
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch playlists' },
      { status: 500 },
    )
  }
}
