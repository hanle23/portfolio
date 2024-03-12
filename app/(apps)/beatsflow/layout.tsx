import type { ReactNode } from 'react'
import { BeatsflowAppWrapper } from '@/app/(apps)/beatsflow/components/appWrapper'
export const metadata = {
  title: 'Beats Flow',
  description: 'A music playlist manager for Spotify',
}
export default function Layout({
  playlists,
  beatsMap,
}: {
  playlists: ReactNode
  beatsMap: ReactNode
}): React.JSX.Element {
  const allRoutes = [
    { node: playlists, value: 'playlists', label: 'Playlists' },
    { node: beatsMap, value: 'beatsMap', label: 'Beats Map' },
  ]
  return (
    <BeatsflowAppWrapper allRoutes={allRoutes}>
      {allRoutes !== undefined &&
        (() => {
          const route = allRoutes.find((route) => route.value === 'playlists')
          return route !== null ? route?.node : null
        })()}
    </BeatsflowAppWrapper>
  )
}
