'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export default function TrackItem({
  index,
  track,
  handleRemoveTrack,
}: {
  index: number
  track: PlaylistTrackObject
  handleRemoveTrack: (trackUri: string) => Promise<void>
}): React.JSX.Element {
  const [isHover, setIsHover] = useState<boolean>(false)

  let img = { url: '', width: 0, height: 0 }
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
        {isHover ? (
          <button className="h-fit w-fit hover:text-spotify-color">
            <PlayArrowIcon />
          </button>
        ) : (
          index + 1
        )}
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
      <div className="flex h-full w-full items-center justify-end">
        <button
          className={`${
            !isHover && 'hidden'
          } truncate text-sm h-fit w-fit hover:text-danger-color`}
          onClick={() => {
            handleRemoveTrack(track.track.uri).catch((e) => {
              console.log(e)
            })
          }}
        >
          <RemoveCircleOutlineIcon />
        </button>
      </div>
      <div className="text-center text-sm">
        <div className="truncate items-center text-sm justify-center h-full w-full flex">
          {Math.floor(track.track.duration_ms / 60000)}:
          {((track.track.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </div>
      </div>
      <div className="flex w-full h-full justify-center items-center">
        <button
          className={`${
            !isHover && 'hidden'
          } truncate text-sm h-fit w-fit hover:text-spotify-color`}
        >
          <MoreHorizIcon />
        </button>
      </div>
    </div>
  )
}
