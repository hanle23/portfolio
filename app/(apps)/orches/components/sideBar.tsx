import React from 'react'
import SelectMode from './selectMode'
import PlaylistCard from './sidebarComponents/playlistCard'

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
  playlists: PlaylistItem[] | undefined
  currPlaylist: PlaylistItem | null
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
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
        {playlists?.map((playlist: PlaylistItem) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            setCurrPlaylist={setCurrPlaylist}
            currPlaylist={currPlaylist}
          />
        ))}
      </div>
    </div>
  )
}
