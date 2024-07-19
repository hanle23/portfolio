import AuthSessionProvider from './components/wrappers/AuthSessionProvider'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
export const metadata = {
  title: 'Orches',
  description: 'A playlist manager for Spotify',
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.JSX.Element> {
  const session = await getServerSession(authOptions)

  return <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
}
