import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import React from 'react'
import MediaPreviewButton from '../../../../components/mediaPreviewButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
export default function SavedTracksItem({
  index,
  track,
  handleAddToPlaylist,
  distinctTracksInPlaylist,
  style,
  trackUrl,
  setTrackUrl,
}: {
  index: number
  track: SavedTracksObject
  handleAddToPlaylist: (
    event: React.MouseEvent<HTMLButtonElement>,
    trackUri: string,
  ) => void
  distinctTracksInPlaylist: Record<string, string[]>
  style: React.CSSProperties | undefined
  trackUrl: string
  setTrackUrl: (url: string) => void
}): JSX.Element {
  const smallestImage = track?.track?.album?.images?.reduce((minImg, img) =>
    img?.width * img?.height < minImg?.width * minImg?.height ? img : minImg,
  )

  return (
    <div
      key={track.track.id}
      style={style}
      className="group grid grid-cols-12 gap-4 py-1 border overflow-hidden relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
    >
      <div className="col-span-1 flex justify-end text-spotify-subtext items-center">
        <MediaPreviewButton
          className="group-hover:block"
          currTrackUrl={track.track.preview_url}
          trackUrl={trackUrl}
          setTrackUrl={setTrackUrl}
        />

        <p className="mr-2 group-hover:hidden">{index + 1}</p>
      </div>
      <div className="col-span-6 lg:col-span-4 flex justify-start items-center gap-3">
        <div className="flex shrink-0 h-full w-12">
          {Object.keys(distinctTracksInPlaylist).length === 0 ||
          track?.track?.id in distinctTracksInPlaylist ? (
            <Image
              src={smallestImage?.url}
              alt="track?.track?.name"
              width={smallestImage?.width < 64 ? 64 : smallestImage?.width}
              height={smallestImage?.height < 64 ? 64 : smallestImage?.height}
              className="w-auto h-auto rounded-md "
            />
          ) : (
            <Tooltip
              title={`${track?.track?.name} is not in any playlist`}
              placement="left-start"
              arrow
              leaveDelay={100}
            >
              <Image
                src={smallestImage?.url}
                alt="track?.track?.name"
                width={smallestImage?.width < 64 ? 64 : smallestImage?.width}
                height={smallestImage?.height < 64 ? 64 : smallestImage?.height}
                className="w-auto h-auto rounded-md border-2 border-spotify-color"
              />
            </Tooltip>
          )}
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

      <div className="col-span-2 flex items-center justify-between">
        <button
          className="group-hover:opacity-100 opacity-0 hover:text-spotify-color"
          onClick={(event) => {
            handleAddToPlaylist(event, track.track.id)
          }}
        >
          <AddCircleOutlineIcon />
        </button>

        <p className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {Math.floor(track?.track?.duration_ms / 60000)}:
          {((track?.track?.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </p>
        <button className="group-hover:opacity-100 opacity-0 hover:text-spotify-color">
          <MoreHorizIcon />
        </button>
      </div>
    </div>
  )
}
