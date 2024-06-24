import type { ReactNode } from 'react'
import OrchesAppWrapper from '@/app/(apps)/orches/components/orchesAppWrapper'
import AuthSessionProvider from './components/wrappers/AuthSessionProvider'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
export const metadata = {
  title: 'Orches',
  description: 'A playlist manager for Spotify',
}
export default async function Layout({
  children,
  playlists,
}: {
  children: React.ReactNode
  playlists: ReactNode
}): Promise<React.JSX.Element> {
  const session = await getServerSession(authOptions)
  const allRoutes = [
    { node: playlists, value: 'playlists', label: 'Playlists' },
  ]

  return (
    <AuthSessionProvider session={session}>
      <OrchesAppWrapper allRoutes={allRoutes}>{children}</OrchesAppWrapper>
    </AuthSessionProvider>
  )
}
