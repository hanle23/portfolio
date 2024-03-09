import React from 'react'
import Image from 'next/image'
export default function PlaylistCard({
  playlist,
}: {
  playlist: PlaylistItem
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
    <div className="flex rounded-lg gap-2 overflow-hidden pr-2.5 min-h-1/4 min-w-2/4 shrink-0">
      <Image
        src={img.url}
        width={80}
        height={80}
        alt=""
        className="shrink-0 p-1 rounded-lg"
      />
      <div className="flex flex-col shrink-0">
        <p className="truncate text-lg font-bold">{playlist.name}</p>
        <p className="truncate">{playlist.description}</p>
        <p>{playlist.tracks.total} songs</p>
      </div>
    </div>
  )
}
