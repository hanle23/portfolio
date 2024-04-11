import React from 'react'
import Image from 'next/image'
import ExternalLink from '@/public/svg/externalLink.svg'
import LeftArrowNotail from '@/public/svg/leftArrowNotail.svg'

export default function PlaylistHeader({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem | null
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  let img = { url: '', width: 0, height: 0 }
  if (playlist?.images !== null) {
    if (playlist?.images.length === 1) {
      img = { url: playlist.images[0].url, width: 250, height: 250 }
    } else {
      img = playlist?.images?.find((image) => image?.width < 500) ?? img
    }
  }
  return (
    <div className="flex gap-5 items-center w-full h-fit sticky top-0 z-30 bg-white/30 backdrop-blur-md rounded-t-md px-2">
      <button
        className="flex p-2 justify-center rounded-full items-center h-fit w-fit bg-spotify-item-background hover:bg-spotify-item-hover"
        onClick={() => {
          setCurrPlaylist(null)
        }}
      >
        <Image
          height={20}
          width={20}
          alt="Return to all playlist"
          src={LeftArrowNotail}
        />
      </button>
      <div className="max-w-[200px] max-h-[200px] w-24 h-24 relative">
        <Image
          alt=""
          className="object-cover"
          src={img.url}
          layout="fill"
          objectFit={'contain'}
        />
      </div>

      <div className="flex flex-col w-full gap-1 content-end">
        <h3 className="text-xl font-bold">{playlist?.name}</h3>
        <p>{playlist?.description}</p>

        <p className="flex h-full justify-start items-center w-fit whitespace-nowrap gap-1">
          {playlist?.tracks.total} songs •{' '}
          <a
            className="flex w-fit items-center h-fit gap-1 underline underline-offset-2"
            href={playlist?.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              height={20}
              width={20}
              alt="external link"
              src={ExternalLink}
            />
          </a>
        </p>
      </div>
    </div>
  )
}
