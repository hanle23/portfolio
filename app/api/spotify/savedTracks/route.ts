import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const realLimit = 50
  let offset = 0
  let tracks: PlaylistItem[] = []
  while (true) {
    let response
    try {
      response = await fetch(
        `https://api.spotify.com/v1/me/tracks?limit=${realLimit}&offset=${offset}`,
        {
          method: 'GET',
          headers: { Authorization: `${authHeader}` },
        },
      )
    } catch (error) {
      console.error('Failed to fetch tracks:', error)
      return NextResponse.json(
        { message: 'Failed to fetch tracks' },
        { status: 500 },
      )
    }

    const data = await response.json()
    tracks = [...tracks, ...data.items]

    if (data.next === null) {
      break
    }

    offset += realLimit
  }

  return NextResponse.json(tracks)
}
