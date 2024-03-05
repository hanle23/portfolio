import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const accessToken = authHeader.slice(7)
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const playlists = await response.json()
  if (playlists.items.length === 0) {
    return NextResponse.json(playlists)
  }

  const userName = req.nextUrl.searchParams.get('username')
  const playlistsWithTracks = await Promise.allSettled(
    playlists.items
      .filter(
        (playlist: PlaylistItem) => playlist.owner.display_name === userName,
      )
      .map(async (playlist: PlaylistItem) => {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
        const tracks = await response.json()
        return { ...playlist, tracks: tracks.items }
      }),
  )
  return NextResponse.json(playlistsWithTracks)
}
