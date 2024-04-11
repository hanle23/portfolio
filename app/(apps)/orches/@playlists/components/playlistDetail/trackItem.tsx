import React from 'react'
import Image from 'next/image'

export default function TrackItem({
  index,
  track,
}: {
  index: number
  track: PlaylistTrackObject
}): React.JSX.Element {
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
    <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
      <div className="flex items-center w-fit">{index + 1}</div>
      <div className="max-w-[200px] max-h-[200px] w-full h-full relative">
        <Image
          alt={track?.track?.name}
          className="object-cover"
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
      <div className="truncate text-sm  hidden md:table-cell md:col-span-2">
        {track.track.album.name}
      </div>
      <div className="text-center text-sm hidden lg:table-cell lg:col-span-2">
        {new Date(track.added_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
      <div className="w-fit">options</div>
      <div className="text-center text-sm">
        {Math.floor(track.track.duration_ms / 60000)}:
        {((track.track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
      </div>
      <div className="w-fit">options</div>
    </div>
  )
}
