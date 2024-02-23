import type { NextRequest } from 'next/server'
// import getClientID from '@/utils/spotify/getClientID'
import { getLocalStorageItem } from '@/utils/LocalStorage'

export async function GET(req: NextRequest): Promise<Response> {
  const authHeader: string | null = req.headers.get('authorization')
  if (authHeader === null || !authHeader.startsWith('Bearer ')) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const accessToken = authHeader.slice(7)
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const profile = await response.json()
  return Response.json(profile)
}

export async function POST(req: Request): Promise<Response> {
  console.log('Post')
  const { code }: { code: string } = await req.json()
  const clientId = process.env.SPOTIFY_CLIENT_ID
  if (clientId === undefined) {
    throw new Error('Client ID not found')
  }
  if (code === null) {
    throw new Error('Code not found')
  }
  const verifier = getLocalStorageItem('verifier')
  if (verifier === null) {
    throw new Error('Code verifier not found')
  }
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', 'http://localhost:3000/beatsflow')
  params.append('code_verifier', verifier)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  const { accessToken } = await result.json()
  return accessToken
}
