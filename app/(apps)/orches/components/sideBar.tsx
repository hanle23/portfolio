'use client'

import useSWR from 'swr'
import React, { useContext } from 'react'
import SelectMode from './selectMode'
import { OrchesContext } from '../components/appWrapper'
import PlaylistCard from './sidebarComponents/playlistCard'

export default function SideBar({
  className,
  allRoutes,
  setCurrentRoute,
  currentRoute,
}: {
  className?: string
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
  currentRoute: string
}): React.JSX.Element {
  const context = useContext(OrchesContext)
  const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  const { data: playlists, isLoading: playlistLoading } = useSWR<
    PlaylistItem[] | undefined
  >(
    fetcher !== null && context?.accessToken !== null
      ? `/api/spotify/playlists?username=${context?.profile?.display_name}`
      : null,
    fetcher,
  )
  return (
    <div
      className={
        className ?? 'flex flex-col gap-6 w-1/4 h-full shrink-0 relative'
      }
    >
      <SelectMode
        className="flex items-center rounded-lg h-[10%] bg-container overflow-x-hidden"
        allRoutes={allRoutes}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <div className="flex flex-col rounded-lg bg-container h-[90%] p-2.5 overflow-x-hidden overflow-y-auto">
        {playlists?.map((playlist: PlaylistItem) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            currentPlaylist={context?.currPlaylist}
            setCurrPlaylist={context?.setCurrPlaylist}
          />
        ))}
      </div>
    </div>
  )
}
