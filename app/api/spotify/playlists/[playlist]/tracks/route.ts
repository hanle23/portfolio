import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { playlist: string } },
): Promise<NextResponse> {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return NextResponse.json({
      message: 'User not authorized to use this action',
      status: 401,
    })
  }
  const body = await request.json()
  let response
  try {
    response = await fetch(
      `https://api.spotify.com/v1/playlists/${params.playlist}/tracks`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.user?.access_token}` },
        body: JSON.stringify(body),
      },
    )
    response = await response.json()
    if (response.error !== undefined) {
      return NextResponse.json({
        message: response.error.message,
        status: response.error.status,
      })
    }
    return NextResponse.json({
      message: 'POST',
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to add track to playlist' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { playlist: string } },
): Promise<NextResponse> {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return NextResponse.json({
      message: 'User not authorized to use this action',
      status: 401,
    })
  }
  const body = await request.json()
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${params.playlist}/tracks`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    )
    const responseJSON = await response.json()
    if (responseJSON.error !== undefined) {
      return NextResponse.json({
        message: responseJSON.error.message,
        status: responseJSON.error.status,
      })
    }
    return NextResponse.json({
      message: 'DELETE',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete playlist item',
      status: 404,
    })
  }
}
