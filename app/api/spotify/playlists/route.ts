// import { NextResponse } from 'next/server'
// import { type NextRequest } from 'next/server'

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   const authHeader: string | null = req.headers.get('authorization')
//   if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
//   }
//   let response
//   const userName = req.nextUrl.searchParams.get('username')
//   try {
//     response = await fetch('https://api.spotify.com/v1/me/playlists', {
//       method: 'GET',
//       headers: { Authorization: `${authHeader}` },
//     })
//   } catch (error) {
//     console.error('Failed to fetch playlists:', error)
//     return NextResponse.json(
//       { message: 'Failed to fetch playlists' },
//       { status: 500 },
//     )
//   }
//   const playlists = await response.json()
//   if (playlists.items === undefined) {
//     return NextResponse.json(
//       { message: `Error while fetching playlists: ${playlists?.error}` },
//       { status: 404 },
//     )
//   }
//   const res = playlists.items.filter(
//     (playlist: PlaylistItem) => playlist.owner.display_name === userName,
//   )
//   return NextResponse.json(res)
// }

import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth/next'

export async function GET(): Promise<NextResponse> {
  const session = await getServerSession(authOptions)
  console.log('session: ', session)
  return NextResponse.json({ message: 'Hello' })
}
