'use client'
import React from 'react'
import Image from 'next/image'
import ExternalLink from '@/public/svg/externalLink.svg'
import LeftArrowNotail from '@/public/svg/leftArrowNotail.svg'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function PlaylistHeader({
  playlist,
  setCurrPlaylist,
}: {
  playlist: SimplifiedPlaylistObject | null
  setCurrPlaylist: React.Dispatch<
    React.SetStateAction<SimplifiedPlaylistObject | null>
  >
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
    <div className="sticky flex flex-col top-0 rounded-t-lg items-center bg-spotify-header-background w-full z-10">
      <div className="flex w-full items-center">
        <button
          className="flex mx-5 p-2 justify-center rounded-full items-center h-fit w-fit bg-spotify-item-background hover:bg-spotify-item-hover"
          onClick={() => {
            setCurrPlaylist(null)
          }}
        >
          <Image height={20} width={20} alt="Return" src={LeftArrowNotail} />
        </button>
        <div className="flex items-center mr-5 max-w-[200px] max-h-[200px] w-24 h-24">
          <Image
            alt=""
            className="object-cover rounded-lg"
            src={smallestImage?.url ?? ''}
            height={smallestImage?.height ?? 60}
            width={smallestImage?.width ?? 60}
            priority
          />
        </div>

        <div className="flex flex-col w-full gap-1 content-end">
          <h3 className="text-xl font-bold">{playlist?.name}</h3>
          <p>{playlist?.description}</p>

          <p className="flex h-full text-spotify-subtext justify-start items-center w-fit whitespace-nowrap gap-1">
            {(playlist?.tracks as { total: number }).total} songs •{' '}
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

      <div className="bg-spotify-header-background text-spotify-subtext w-full h-8 grid grid-cols-12 gap-4 border-b relative border-spotify-item-background border-solid px-4">
        <div className="col-span-1 flex justify-end items-center">{'#'}</div>
        <div className="col-span-6 lg:col-span-4 flex align-middle items-center">
          <p className="text-sm">Title</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="text-sm">Album</p>
        </div>
        <div className="hidden lg:flex lg:col-span-2 justify-center items-center">
          <p className="text-sm">Date Added</p>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <AccessTimeIcon />
        </div>
      </div>
    </div>
  )
}
