'use client'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { BeatsflowAppWrapper } from '@/app/(apps)/beatsflow/components/appWrapper'
// export const metadata = {
//   title: 'Beats Flow',
//   description: 'A music playlist manager for Spotify',
// }
export default function Layout({
  playlists,
  beatsMap,
}: {
  playlists: ReactNode
  beatsMap: ReactNode
}): React.JSX.Element {
  const [currentRoute, setCurrentRoute] = useState('playlists')
  const allRoutes = [
    { node: playlists, value: 'playlists', label: 'Playlists' },
    { node: beatsMap, value: 'beatsMap', label: 'Beats Map' },
  ]
  return (
    <BeatsflowAppWrapper
      allRoutes={allRoutes}
      setCurrentRoute={setCurrentRoute}
    >
      {allRoutes !== undefined &&
        (() => {
          const route = allRoutes.find((route) => route.value === currentRoute)
          return route !== null ? route?.node : null
        })()}
    </BeatsflowAppWrapper>
  )
}
