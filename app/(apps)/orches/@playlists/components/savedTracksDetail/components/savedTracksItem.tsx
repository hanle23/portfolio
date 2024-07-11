import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import Image from 'next/image'
import React from 'react'
export default function SavedTracksItem({
  index,
  track,
}: {
  index: number
  track: SavedTracksObject
}): JSX.Element {
  const smallestImage = track?.track?.album?.images?.reduce((minImg, img) =>
    img?.width * img?.height < minImg?.width * minImg?.height ? img : minImg,
  )
  console.log(track)

  return (
    <div
      key={track.track.id}
      className="grid grid-cols-12 gap-4 border relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
    >
      <div className="col-span-1 flex justify-end text-spotify-subtext">
        {index + 1}
      </div>

      <div className="col-span-6 lg:col-span-4 flex align-middle">
        <Image
          src={smallestImage?.url}
          alt=""
          width={40}
          height={40}
          className="mr-3 shrink-0 bg-image-background"
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
