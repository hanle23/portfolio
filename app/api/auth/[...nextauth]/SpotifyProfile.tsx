import type { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

if (process?.env?.NEXT_PUBLIC_SPOTIFY_CLIENT_ID === undefined) {
  throw new Error('Missing SPOTIFY_CLIENT_ID')
}

if (process?.env?.SPOTIFY_CLIENT_SECRET === undefined) {
  throw new Error('Missing SPOTIFY_CLIENT_SECRET')
}

const spotifyProfile = SpotifyProvider({
  clientId: process?.env?.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process?.env?.SPOTIFY_CLIENT_SECRET,
})

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
]

spotifyProfile.authorization = {
  url: 'https://accounts.spotify.com/authorize',
  params: {
    scope: scopes.join(' '),
  },
}

export default spotifyProfile

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    if (typeof token.refresh_token === 'string') {
      params.append('refresh_token', token.refresh_token)
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
      method: 'POST',
      body: params,
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }
    const currentTimeMs = Date.now()

    // Convert expires_in to milliseconds (since it's provided in seconds)
    const expiresInMs = refreshedTokens.expires_in * 1000

    // Calculate expires_at in milliseconds by adding expiresInMs to the current time
    const expiresAtMs = currentTimeMs + expiresInMs

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: expiresAtMs / 1000,
      expires_in: expiresInMs,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}
