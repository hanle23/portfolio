import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

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
  const realLimit = 50
  const offset = req.nextUrl.searchParams.get('offset')
  try {
    response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=${realLimit}&offset=${offset}`,
      {
        method: 'GET',
        headers: { Authorization: `${authHeader}` },
      },
    )
  } catch (error) {
    console.error('Failed to fetch playlist items:', error)
    return NextResponse.json(
      { message: 'Failed to fetch playlist items' },
      { status: 500 },
    )
  }
  const res = await response.json()
  return NextResponse.json({
    items: res.items,
    next: res.next,
    limit: res.limit,
    offset: res.offset,
    total: res.total,
  })
}
