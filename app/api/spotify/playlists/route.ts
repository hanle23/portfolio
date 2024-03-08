import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  let response
  const userName = req.nextUrl.searchParams.get('username')
  try {
    response = await fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: { Authorization: `${authHeader}` },
    })
  } catch (error) {
    console.error('Failed to fetch playlists:', error)
    return NextResponse.json(
      { message: 'Failed to fetch playlists' },
      { status: 500 },
    )
  }
  const playlists = await response.json()
  const res = playlists.items.filter(
    (playlist: PlaylistItem) => playlist.owner.display_name === userName,
  )
  return NextResponse.json(res)
}
