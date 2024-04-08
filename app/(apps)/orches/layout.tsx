'use client'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { OrchesAppWrapper } from '@/app/(apps)/orches/components/appWrapper'
import { usePathname } from 'next/navigation'
// export const metadata = {
//   title: 'Beats Flow',
//   description: 'A music playlist manager for Spotify',
// }
export default function Layout({
  children,
  playlists,
  beatsMap,
}: {
  children: React.ReactNode
  playlists: ReactNode
  beatsMap: ReactNode
}): React.JSX.Element {
  const pathname = usePathname()
  const [currentRoute, setCurrentRoute] = useState('playlists')
  const allRoutes = [
    { node: playlists, value: 'playlists', label: 'Playlists' },
    { node: beatsMap, value: 'beatsMap', label: 'Beats Map' },
  ]
  return (
    <OrchesAppWrapper allRoutes={allRoutes} setCurrentRoute={setCurrentRoute}>
      {allRoutes !== undefined && pathname !== '/orches/profile'
        ? (() => {
            const route = allRoutes.find(
              (route) => route.value === currentRoute,
            )
            return route !== null ? route?.node : null
          })()
        : children}
    </OrchesAppWrapper>
  )
}
