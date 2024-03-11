import { Select, SelectItem } from '@nextui-org/react'
export default function SelectMode({
  className,
}: {
  className: string
}): React.JSX.Element {
  const modes = [
    { value: 'playlist', label: 'Playlist' },
    { value: 'playlist1', label: 'Playlist1' },
    { value: 'playlist2', label: 'Playlist2' },
  ]
  return (
    <div className={className}>
      <Select
        items={modes}
        label="Select a mode"
        defaultSelectedKeys={['playlist']}
        className=""
        disallowEmptySelection={true}
        size="lg"
        listboxProps={{
          className: 'bg-[#27272a] text-white h-fit rounded-md',
        }}
        popoverProps={{ className: '' }}
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
      {/* <select className="flex w-full rounded-lg p-2.5 h-full bg-[#27272a]">
        {modes.map((mode) => (
          <option key={mode.value}>{mode.label}</option>
        ))}
      </select> */}
    </div>
  )
}
