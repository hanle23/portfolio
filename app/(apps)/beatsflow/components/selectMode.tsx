'use client'
import { Select, SelectItem } from '@nextui-org/react'
export default function SelectMode({
  className,
  allRoutes,
  setCurrentRoute,
}: {
  className: string
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
  setCurrentRoute: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  return (
    <div className={className}>
      <div className="flex flex-col w-full h-fit">
        <div className="h-fit font-semibold px-2.5 w-full">Select Mode:</div>
        <Select
          items={allRoutes}
          defaultSelectedKeys={['playlists']}
          aria-label="Select mode"
          className="text-lg mt-auto"
          disallowEmptySelection={true}
          onSelectionChange={(e) => {
            setCurrentRoute(Array.from(e)[0] as string)
          }}
          size="lg"
          listboxProps={{
            className: 'bg-spotify-item-background text-white h-fit rounded-md',
          }}
          selectionMode="single"
          labelPlacement="inside"
        >
          {allRoutes.map((route) => (
            <SelectItem
              className="text-white hover:bg-spotify-item-hover"
              key={route.value}
            >
              {route.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
