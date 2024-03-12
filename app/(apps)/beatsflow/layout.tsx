import type { ReactNode } from 'react'
import { BeatsflowAppWrapper } from '@/app/(apps)/beatsflow/components/appWrapper'
export const metadata = {
  title: 'Beats Flow',
  description: 'A music playlist manager for Spotify',
}
export default function Layout({
  children,
  playlists,
}: {
  children: ReactNode
  playlists: ReactNode
}): React.JSX.Element {
  return (
    <BeatsflowAppWrapper>
      {children}
      {playlists}
    </BeatsflowAppWrapper>
  )
}
