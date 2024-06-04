import React from 'react'
import Image from 'next/image'
export default function PlaylistCard({
  playlist,
  setCurrPlaylist,
  currPlaylist,
  index,
}: {
  playlist: PlaylistItem
  setCurrPlaylist:
    | React.Dispatch<React.SetStateAction<PlaylistItem | null>>
    | undefined
  currPlaylist: PlaylistItem | null | undefined
  index: number
}): React.JSX.Element {
  let img = { url: '', width: 0, height: 0 }
  if (playlist?.images !== null) {
    if (playlist.images.length === 1) {
      img = { url: playlist.images[0].url, width: 80, height: 80 }
    } else {
      img = playlist?.images?.find((image) => image?.width < 1000) ?? img
    }
  }
  return (
    <div
      className={`flex rounded-lg gap-2 ${
        currPlaylist?.id === playlist?.id
          ? 'bg-spotify-color bg-opacity-40 hover:bg-opacity-70'
          : 'hover:bg-playlist-hover'
      } overflow-hidden cursor-pointer py-1 px-2.5 min-h-1/4 min-w-2/4 shrink-0 `}
      onClick={() => {
        if (setCurrPlaylist !== undefined) {
          setCurrPlaylist(playlist)
        }
      }}
    >
      <Image
        src={img.url}
        width={80}
        height={80}
        alt=""
        className="shrink-0 p-1 rounded-lg"
        priority={index === 0}
      />
      <div className="flex flex-col shrink-0">
        <p className="truncate text-md font-bold">{playlist.name}</p>
        <p className="truncate text-sm">{playlist.description}</p>
        <p className="truncate text-sm">{playlist.tracks.total} songs</p>
      </div>
    </div>
  )
}
