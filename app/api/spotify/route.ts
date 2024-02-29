import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import getClientID from '@/utils/spotify/getClientID'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const accessToken = authHeader.slice(7)
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const profile = await response.json()
  return NextResponse.json(profile)
}

export async function POST(
  req: Request,
): Promise<NextResponse<{ accessToken: string }>> {
  const {
    code,
    verifier,
    grantType,
  }: { code: string; verifier: string; grantType: string } = await req.json()
  const clientId = getClientID()
  if (clientId === undefined) {
    throw new Error('Client ID not found')
  }
  if (code === null) {
    throw new Error('Code not found')
  }
  if (verifier === null) {
    throw new Error('Code verifier not found')
  }
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('grant_type', grantType)
  params.append('code', code)
  params.append('redirect_uri', 'http://localhost:3000/beatsflow')
  params.append('code_verifier', verifier)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })
  const resJSON = await result.json()
  return NextResponse.json(resJSON)
}
