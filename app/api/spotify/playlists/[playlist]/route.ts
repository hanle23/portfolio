import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  let response
  const playlistID = req.nextUrl.searchParams.get('playlistID')
  const realLimit = 50
  const offset = 0
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
  return NextResponse.json(await response.json())
  //   const userName = req.nextUrl.searchParams.get('username')
  //   const playlistsWithTracks = await Promise.allSettled(
  //     playlists.items
  //       .filter(
  //         (playlist: PlaylistItem) => playlist.owner.display_name === userName,
  //       )
  //       .map(async (playlist: PlaylistItem) => {
  //         let response
  //         try {
  //           response = await fetch(
  //             `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
  //             {
  //               method: 'GET',
  //               headers: { Authorization: `${authHeader}` },
  //             },
  //           )
  //         } catch (error) {
  //           return NextResponse.json(
  //             {
  //               error: `Failed to fetch tracks for playlist ${playlist.id}: ${
  //                 error as string
  //               }`,
  //             },
  //             { status: 500 },
  //           )
  //         }
  //         const tracks = await response.json()
  //         return { ...playlist, tracks: tracks.items }
  //       }),
  //   )
  //   const fulfilledPlaylists = playlistsWithTracks
  //     .filter(
  //       (result): result is PromiseFulfilledResult<PlaylistItem> =>
  //         result.status === 'fulfilled',
  //     )
  //     .map((result) => result.value)
  //   return NextResponse.json(fulfilledPlaylists)
}
