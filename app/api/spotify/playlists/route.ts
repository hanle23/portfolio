import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { BASE_URL } from '@/constants/spotify/playlist'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return NextResponse.json({
      message: 'User not authorized to use this action',
      status: 401,
    })
  }
  const offset = req.nextUrl.searchParams.get('offset')
  const limit = req.nextUrl.searchParams.get('limit')

  let response
  try {
    response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session?.user?.access_token}` },
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
