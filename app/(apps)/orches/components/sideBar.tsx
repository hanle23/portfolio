import React from 'react'
import SelectMode from './selectMode'

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
      <div className="flex rounded-lg bg-container h-[90%] p-2.5 overflow-x-hidden">
        <p className="font-bold text-lg">Playlists</p>
      </div>
    </div>
  )
}
