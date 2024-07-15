'use client'
import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import Image from 'next/image'
import React, { useState } from 'react'
import MediaPreviewButton from '../../../../components/mediaPreviewButton'
export default function SavedTracksItem({
  index,
  track,
  currentTrack,
  setCurrentTrack,
  trackAudio,
}: {
  index: number
  track: SavedTracksObject
  currentTrack: string | null | undefined
  setCurrentTrack:
    | React.Dispatch<React.SetStateAction<string | null>>
    | undefined
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined> | undefined
}): JSX.Element {
  const [isHover, setIsHover] = useState<boolean>(false)
  const smallestImage = track?.track?.album?.images?.reduce((minImg, img) =>
    img?.width * img?.height < minImg?.width * minImg?.height ? img : minImg,
  )

  return (
    <div
      key={track.track.id}
      className="grid grid-cols-12 gap-4 py-1 border relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
      onMouseOver={() => {
        setIsHover(true)
      }}
      onMouseOut={() => {
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
          <p className="mr-2">{index + 1}</p>
        )}
      </div>

      <div className="col-span-6 lg:col-span-4 flex justify-start items-center gap-3">
        <div className="flex shrink-0 h-full w-12">
          <Image
            src={smallestImage?.url}
            alt="track?.track?.name"
            width={smallestImage?.width < 64 ? 64 : smallestImage?.width}
            height={smallestImage?.height < 64 ? 64 : smallestImage?.height}
            className="w-auto h-auto rounded-md"
          />
        </div>

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
        <p className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {new Date(track.added_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="col-span-2 flex">
        <p className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {Math.floor(track?.track?.duration_ms / 60000)}:
          {((track?.track?.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
