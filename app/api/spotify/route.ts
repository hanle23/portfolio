import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<Response> {
  console.log('Here')
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
