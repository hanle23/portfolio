import React from 'react'
import SelectMode from './selectMode'

export default function SideBar({
  className,
  allRoutes,
}: {
  className?: string
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
}): React.JSX.Element {
  return (
    <div className={className ?? 'flex flex-col gap-6 w-1/4 h-full shrink-0'}>
      <SelectMode
        className="flex items-center rounded-lg h-[10%] bg-container"
        allRoutes={allRoutes}
      />
      <div className="flex rounded-lg bg-container h-[90%] p-2.5">
        <p className="font-bold text-lg">Liked Songs</p>
      </div>
    </div>
  )
}
