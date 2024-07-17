import type { DefaultSession } from 'next-auth'
import type { AuthUser } from './spotify/auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AuthUser & DefaultSession['user']
  }
}
