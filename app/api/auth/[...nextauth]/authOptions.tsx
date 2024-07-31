import spotifyProfile, { refreshAccessToken } from './SpotifyProfile'
import type { Account, AuthOptions } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { AuthUser } from '@/app/types/spotify/auth'
export const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  session: {
    maxAge: 60 * 59,
    strategy: 'jwt',
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
        return {
          ...token,
          access_token: account.access_token,
          token_type: account.token_type,
          expires_at: account.expires_at,
          expires_in: account.expires_in,
          refresh_token: account.refresh_token,
          scope: account.scope,
        }
      }
      const updatedToken = {
        ...token,
        access_token: token?.access_token,
        token_type: token?.token_type,
        expires_at: Number(token?.expires_at ?? Date.now() / 1000),
        expires_in: Number(token?.expires_in ?? 0) - Date.now() / 1000,
        refresh_token: token?.refresh_token,
        scope: token?.scope,
        id: token?.providerAccountId,
      }

      if (Number(Date.now() / 1000) + 5 * 60 >= updatedToken.expires_at) {
        return await refreshAccessToken(updatedToken)
      }

      return updatedToken
    },
    async session({ session, token }: { session: any; token: any }) {
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
