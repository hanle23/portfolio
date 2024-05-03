'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export default function TrackItem({
  index,
  track,
}: {
  index: number
  track: PlaylistTrackObject
}): React.JSX.Element {
  let img = { url: '', width: 0, height: 0 }
  const [isHover, setIsHover] = useState<boolean>(false)
  if (track?.track?.album?.images !== null) {
    if (track?.track?.album?.images.length === 1) {
      img = {
        url: track?.track?.album?.images[0].url,
        width: 250,
        height: 250,
      }
    } else {
      img =
        track?.track?.album?.images?.find((image) => image?.width < 300) ?? img
    }
  }

  return (
    <div
      className="grid grid-cols-8 py-2 px-3 rounded-md gap-2 md:grid-cols-10 lg:grid-cols-12 hover:bg-spotify-item-hover"
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      <div className="flex items-center w-full h-full justify-center">
        {isHover ? <PlayArrowIcon /> : index + 1}
      </div>
      <div className="max-w-[200px] max-h-[200px] w-full h-full relative">
        <Image
          alt={track?.track?.name}
          className="overflow-hidden"
          src={img.url}
          width={img.width}
          height={img.height}
        />
      </div>
      <div className="flex flex-col col-span-3">
        <p className="truncate">{track.track.name}</p>
        <div className="truncate text-small">
          {track.track.artists.map((artist, index) => (
            <React.Fragment key={artist.id}>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {artist.name}
              </a>{' '}
              {index < track.track.artists.length - 1 && ', '}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="hidden md:table-cell md:col-span-2">
        <div className="truncate items-center text-sm text-left h-full w-full flex">
          {track.track.album.name}
        </div>
      </div>
      <div className="h-full text-sm hidden lg:table-cell lg:col-span-2">
        <div className="truncate items-center text-sm justify-center h-full w-full flex">
          {new Date(track.added_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>
      <div className="h-full w-full">
        <div
          className={`${
            isHover ? 'flex' : 'hidden'
          } truncate items-center text-sm justify-end h-full w-full`}
        >
          <RemoveCircleOutlineIcon />
        </div>
      </div>
      <div className="text-center text-sm">
        <div className="truncate items-center text-sm justify-center h-full w-full flex">
          {Math.floor(track.track.duration_ms / 60000)}:
          {((track.track.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </div>
      </div>
      <div className="w-full h-full">
        <div
          className={`${
            isHover ? 'flex' : 'hidden'
          } truncate items-center text-sm justify-center h-full w-full`}
        >
          <MoreHorizIcon />
        </div>
      </div>
    </div>
  )
}
