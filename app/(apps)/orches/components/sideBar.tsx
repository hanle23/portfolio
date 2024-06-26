import React from 'react'
import SelectMode from './selectMode'
import PlaylistCard from './sidebarComponents/playlistCard'
import type { DetailsPlaylistItem } from '@/app/types/types'
export default function SideBar({
  className,
  allRoutes,
  setCurrentRoute,
  currentRoute,
  playlists,
  currPlaylist,
  setCurrPlaylist,
}: {
  className?: string
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
  currentRoute: string
  playlists: DetailsPlaylistItem[] | undefined
  currPlaylist: DetailsPlaylistItem | null
  setCurrPlaylist: React.Dispatch<
    React.SetStateAction<DetailsPlaylistItem | null>
  >
}): React.JSX.Element {
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
        {playlists?.map((playlist: DetailsPlaylistItem, index: number) => (
          <PlaylistCard
            key={playlist.id}
            index={index}
            playlist={playlist}
            setCurrPlaylist={setCurrPlaylist}
            currPlaylist={currPlaylist}
          />
        ))}
      </div>
    </div>
  )
}
