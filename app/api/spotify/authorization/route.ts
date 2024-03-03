import { NextResponse } from 'next/server'
import getClientID from '@/utils/spotify/getClientID'

export async function POST(req: Request): Promise<NextResponse<any>> {
  const {
    code,
    verifier,
    refreshToken,
    grantType,
  }: {
    code?: string
    verifier?: string
    refreshToken?: string
    grantType: string
  } = await req.json()

  const clientId = getClientID()
  if (clientId === undefined) {
    throw new Error('Client ID not found')
  }
  if (grantType === undefined) {
    return NextResponse.json(
      { error: 'Missing parameter: grantType' },
      { status: 400 },
    )
  }

  const params = new URLSearchParams()
  params.append('client_id', clientId)
  if (grantType === 'authorization_code') {
    if (code === undefined) {
      return NextResponse.json(
        { error: 'Missing parameter: code' },
        { status: 400 },
      )
    }
    if (verifier === undefined) {
      return NextResponse.json(
        { error: 'Missing parameter: code' },
        { status: 400 },
      )
    }
    params.append('grant_type', grantType)
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:3000/beatsflow')
    params.append('code_verifier', verifier)
  } else if (grantType === 'refresh_token') {
    if (refreshToken === undefined) {
      return NextResponse.json(
        { error: 'Missing parameter: refreshToken' },
        { status: 400 },
      )
    }
    params.append('grant_type', grantType)
    params.append('refresh_token', refreshToken)
  }

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })
  const resJSON = await result.json()
  return NextResponse.json(resJSON)
}
