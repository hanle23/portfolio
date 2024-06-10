'use client'

import type {
  AccessToken,
  IAuthStrategy,
  SdkConfiguration,
  SdkOptions,
} from '@spotify/web-api-ts-sdk'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import type { AuthUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { getSession, signIn } from 'next-auth/react'

/**
 * A class that implements the IAuthStrategy interface and wraps the NextAuth functionality.
 * It retrieves the access token and other information from the JWT session handled by NextAuth.
 */
class NextAuthStrategy implements IAuthStrategy {
  public async getOrCreateAccessToken(): Promise<AccessToken> {
    return await this.getAccessToken()
  }

  public async getAccessToken(): Promise<AccessToken> {
    const session: any = await getSession()
    let token: AccessToken = {
      access_token: '',
      token_type: 'Bearer',
      expires_in: 0,
      expires: 0,
      refresh_token: '',
    }
    if (session === null) {
      return token
    }

    if (session?.error === 'RefreshAccessTokenError') {
      await signIn()
      return await this.getAccessToken()
    }

    const { user }: { user: AuthUser } = session
    token = {
      access_token: user.access_token,
      token_type: 'Bearer',
      expires_in: user.expires_in,
      expires: user.expires_at,
      refresh_token: user.refresh_token,
    }

    return token
  }

  public removeAccessToken(): void {
    console.warn('[Spotify-SDK][WARN]\nremoveAccessToken not implemented')
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    console.warn('[Spotify-SDK][WARN]\nsetConfiguration not implemented')
  }
}

function withNextAuthStrategy(config?: SdkOptions): SpotifyApi {
  const strategy = new NextAuthStrategy()
  return new SpotifyApi(strategy, config)
}

export default withNextAuthStrategy()
