import React from 'react'
import SelectMode from './selectMode'
import PlaylistCard from './sidebarComponents/playlistCard'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'

export default function SideBar({
  className,
  setCurrentRoute,
  currentRoute,
  playlists,
  currPlaylist,
  setCurrPlaylist,
}: {
  className?: string
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
  currentRoute: string

  currPlaylist: SimplifiedPlaylistObject | null
  setCurrPlaylist: (id: string) => void
  playlists: Array<{
    name: string
    id: string
    images: Array<{
      url: string
      height: number | null
      width: number | null
    }>
    numOfTracks: number
    description: string
  }>
}): React.JSX.Element {
  const allRoutes = [{ value: 'playlists', label: 'Playlists' }]
  return (
    <div className={className ?? 'flex flex-col gap-6 w-1/4 h-full relative'}>
      <SelectMode
        className="flex items-center rounded-lg h-[10%] bg-container overflow-x-hidden shrink-0 min-w-36"
        allRoutes={allRoutes}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <div className="flex flex-col rounded-lg bg-container h-[87%] p-2.5 overflow-x-hidden overflow-y-auto shrink-0 min-w-36">
        {playlists?.map(
          (
            playlist: {
              name: string
              id: string
              images: Array<{
                url: string
                height: number | null
                width: number | null
              }>
              numOfTracks: number
              description: string
            },
            index: number,
          ) => (
            <PlaylistCard
              key={playlist.id}
              index={index}
              playlist={playlist}
              setCurrPlaylist={setCurrPlaylist}
              currPlaylist={currPlaylist}
            />
          ),
        )}
      </div>
    </div>
  )
}
