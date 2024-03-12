'use client'
import { Select, SelectItem } from '@nextui-org/react'
export default function SelectMode({
  className,
}: {
  className: string
}): React.JSX.Element {
  const modes = [{ value: 'playlist', label: 'Playlist' }]
  return (
    <div className={className}>
      <div className="flex flex-col w-full h-fit">
        <div className="h-fit font-semibold px-2.5 w-full">Select Mode:</div>
        <Select
          items={modes}
          defaultSelectedKeys={['playlist']}
          aria-label="Select mode"
          className="text-lg"
          disallowEmptySelection={true}
          size="lg"
          listboxProps={{
            className: 'bg-[#27272a] text-white h-fit rounded-md',
          }}
          selectionMode="single"
          labelPlacement="inside"
        >
          {modes.map((mode) => (
            <SelectItem
              className="text-white hover:bg-[#3c3c3e]"
              key={mode.value}
            >
              {mode.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  )
}
