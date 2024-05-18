import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { LIMIT, BASE_URL } from '@/constants/spotify/savedTracks'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const offset = req.nextUrl.searchParams.get('offset')

  let response
  try {
    response = await fetch(
      `${BASE_URL}/tracks?limit=${LIMIT}&offset=${offset}`,
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
  return NextResponse.json(response)
}
