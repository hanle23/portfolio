import React from 'react'
import Image from 'next/image'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'

export default function PlaylistCard({
  playlist,
  setCurrPlaylist,
  currPlaylist,
  index,
}: {
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
  }
  setCurrPlaylist: (id: string) => void
  currPlaylist: SimplifiedPlaylistObject | null | undefined
  index: number
}): React.JSX.Element {
  const smallestImage = playlist?.images?.reduce((minImg, img) =>
    img.width !== null &&
    img.height !== null &&
    minImg.width !== null &&
    minImg.height !== null &&
    img?.width * img?.height < minImg?.width * minImg?.height
      ? img
      : minImg,
  )
  return (
    <div
      className={`flex rounded-lg gap-2 ${
        currPlaylist?.id === playlist?.id
          ? 'bg-spotify-color bg-opacity-40 hover:bg-opacity-70'
          : 'hover:bg-playlist-hover'
      } overflow-hidden cursor-pointer py-1 px-2.5 min-h-1/4 min-w-2/4 shrink-0 `}
      onClick={() => {
        if (setCurrPlaylist !== undefined) {
          setCurrPlaylist(playlist?.id)
        }
      }}
    >
      <Image
        src={smallestImage?.url}
        width={
          smallestImage?.width == null || smallestImage?.width < 80
            ? 80
            : smallestImage?.width
        }
        height={
          smallestImage?.height == null || smallestImage?.height < 80
            ? 80
            : smallestImage?.height
        }
        alt={playlist.name}
        className="shrink-0 p-1 rounded-lg"
        priority={index === 0}
      />
      <div className="flex flex-col shrink-0">
        <p className="truncate text-md font-bold">{playlist.name}</p>
        <p className="truncate text-sm text-spotify-subtext">
          {playlist.description}
        </p>
        <p className="truncate text-sm text-spotify-subtext">
          {`${playlist?.numOfTracks} songs`}
        </p>
      </div>
    </div>
  )
}
