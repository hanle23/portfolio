'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import MediaPreviewButton from '../../../../components/mediaPreviewButton'
import type { PlaylistTrackObject } from '@/app/types/spotify/playlist'

export default function PlaylistTrackItem({
  index,
  track,
  handleRemoveTrack,
  currentTrack,
  setCurrentTrack,
  trackAudio,
}: {
  index: number
  track: PlaylistTrackObject
  handleRemoveTrack: (trackUri: string) => Promise<void>
  currentTrack: string | null
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined> | undefined
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
  return track?.track !== null ? (
    <div
      className="grid grid-cols-12 gap-4 border relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      <div className="col-span-1 flex justify-end text-spotify-subtext items-center">
        {isHover ? (
          <MediaPreviewButton
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            trackAudio={trackAudio}
            trackUrl={track.track.preview_url}
          />
        ) : (
          index + 1
        )}
      </div>
      <div className="col-span-6 lg:col-span-4 flex align-middle">
        <Image
          src={img?.url}
          alt=""
          width={40}
          height={40}
          className="mr-3 shrink-0 bg-image-background rounded-md"
        />
        <div className="grid">
          <a
            href={track?.track?.external_urls?.spotify}
            target="_blank"
            className="truncate"
          >
            {track?.track?.name}
          </a>
          <span className="truncate text-sm text-spotify-subtext">
            {track?.track?.artists.map((artist, index) => (
              <React.Fragment key={artist.id}>
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {artist.name}
                </a>{' '}
                {index < track?.track?.artists.length - 1 && ', '}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
      <div className="col-span-3">
        <p className="truncate items-center text-spotify-subtext text-sm text-left h-full w-full flex">
          {track?.track?.album.name}
        </p>
      </div>
      <div className="hidden lg:flex lg:col-span-2">
        <div className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {new Date(track?.added_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-around">
        <button
          className={`${
            !isHover && 'hidden'
          } truncate text-sm hover:text-danger-color`}
          onClick={() => {
            handleRemoveTrack(track?.track?.uri).catch((e) => {
              console.log(e)
            })
          }}
        >
          <RemoveCircleOutlineIcon />
        </button>
        <div className="truncate items-center text-spotify-subtext text-sm justify-center flex">
          {Math.floor(track?.track?.duration_ms / 60000)}:
          {((track?.track?.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </div>
        <button
          className={`${
            !isHover && 'hidden'
          } truncate text-sm h-fit w-fit hover:text-spotify-color`}
        >
          <MoreHorizIcon />
        </button>
      </div>
    </div>
  ) : (
    <></>
  )
}
