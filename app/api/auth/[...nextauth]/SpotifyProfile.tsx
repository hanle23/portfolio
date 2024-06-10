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
    if (typeof token.refreshToken === 'string') {
      params.append('refresh_token', token.refreshToken)
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

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      tokenType: refreshedTokens.token_type,
      expiresAt: refreshedTokens.expires_at,
      expiresIn: (refreshedTokens.expires_at ?? 0) - Date.now() / 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
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
