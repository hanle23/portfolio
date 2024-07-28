import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { BASE_URL } from '@/constants/spotify/playlist'

export async function GET(
  req: NextRequest,
  { params }: { params: { playlist: string } },
): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  let response
  const playlistID = params.playlist
  const limit = req.nextUrl.searchParams.get('limit')
  const offset = req.nextUrl.searchParams.get('offset')
  try {
    response = await fetch(
      `${BASE_URL}/${playlistID}/tracks?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: { Authorization: `${authHeader}` },
      },
    )
    response = await response.json()
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch playlist items:', error)
    return NextResponse.json(
      { message: 'Failed to fetch playlist items' },
      { status: 500 },
    )
  }
}
