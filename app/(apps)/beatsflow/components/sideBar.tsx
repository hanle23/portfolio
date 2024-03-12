import React from 'react'
import SelectMode from './selectMode'

export default function SideBar({
  className,
}: {
  className?: string
}): React.JSX.Element {
  return (
    <div className={className ?? 'flex flex-col gap-6 w-1/4 h-full shrink-0'}>
      <SelectMode className="flex p-3 rounded-lg h-1/6 bg-container" />
      <div className="flex rounded-lg bg-container h-4/5 p-2.5">
        <p className="font-bold text-lg">Liked Songs</p>
      </div>
    </div>
  )
}
