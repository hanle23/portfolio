import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const accessToken = authHeader.slice(7)
  let response
  try {
    response = await fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  } catch (error) {
    console.error('Failed to fetch playlists:', error)
    return NextResponse.json(
      { message: 'Failed to fetch playlists' },
      { status: 500 },
    )
  }
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
        let response
        try {
          response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
            {
              method: 'GET',
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          )
        } catch (error) {
          return NextResponse.json(
            {
              error: `Failed to fetch tracks for playlist ${playlist.id}: ${
                error as string
              }`,
            },
            { status: 500 },
          )
        }
        const tracks = await response.json()
        return { ...playlist, tracks: tracks.items }
      }),
  )
  const fulfilledPlaylists = playlistsWithTracks
    .filter(
      (result): result is PromiseFulfilledResult<PlaylistItem> =>
        result.status === 'fulfilled',
    )
    .map((result) => result.value)
  return NextResponse.json(fulfilledPlaylists)
}
