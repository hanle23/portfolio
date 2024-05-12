import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { LIMIT, BASE_URL } from '@/constants/spotify/playlist'

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
  const offset = req.nextUrl.searchParams.get('offset')
  try {
    response = await fetch(
      `${BASE_URL}/${playlistID}/tracks?limit=${LIMIT}&offset=${offset}`,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { playlist: string } },
): Promise<NextResponse> {
  const authHeader: string | null = request.headers.get('authorization')
  if (authHeader === null || !authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const body = await request.json()
  try {
    const response = await fetch(`${BASE_URL}/${params.playlist}/tracks`, {
      method: 'DELETE',
      headers: {
        Authorization: `${authHeader}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (response.status !== 200) {
      return NextResponse.json({
        message: 'Failed to delete playlist item',
        status: response.status,
      })
    }
    return NextResponse.json({
      message: 'DELETE',
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete playlist item',
      status: 404,
    })
  }
}
