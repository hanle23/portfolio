import spotifyProfile, { refreshAccessToken } from './SpotifyProfile'
import type { Account, AuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

export const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: JWT
      account: Account | null
    }): Promise<JWT> {
      if (account !== null && account !== undefined) {
        const newToken = {
          ...token,
          access_token: account.accessToken,
          token_type: account.tokenType,
          expires_at: account.expiresAt,
          refresh_token: account.refreshToken,
          scope: account.scope,
        }
        console.log('On sign in: ', token)
        return newToken
      }
      // console.log('On Session checking: ', token)
      // console.log('Date Now: ' + Date.now())
      const updatedToken = {
        ...token,
        access_token: token?.access_token,
        token_type: token?.token_type,
        expires_at: Number(token?.expires_at ?? Date.now() / 1000),
        expires_in: Number(token?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: token?.refresh_token,
        scope: token?.scope,
        id: token?.providerAccountId,
      }

      if (Date.now() < updatedToken.expires_at) {
        return await refreshAccessToken(updatedToken)
      }

      return updatedToken
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log('Token: ', session, token)
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      }
      session.user = user
      session.error = token.error
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
