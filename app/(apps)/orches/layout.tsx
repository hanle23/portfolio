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
  beatsMap,
}: {
  children: React.ReactNode
  playlists: ReactNode
  beatsMap: ReactNode
}): Promise<React.JSX.Element> {
  const session = await getServerSession(authOptions)
  const allRoutes = [
    { node: playlists, value: 'playlists', label: 'Playlists' },
    { node: beatsMap, value: 'beatsMap', label: 'Beats Map' },
  ]

  return (
    <AuthSessionProvider session={session}>
      <OrchesAppWrapper allRoutes={allRoutes}>{children}</OrchesAppWrapper>
    </AuthSessionProvider>
  )
}
