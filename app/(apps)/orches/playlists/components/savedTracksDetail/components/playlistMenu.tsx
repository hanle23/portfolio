'use client'

import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PlaylistMenu({
  anchorEl,
  handleClose,
  playlists,
  open,
  isSubmittable,
}: {
  anchorEl: HTMLElement | null
  handleClose: () => void
  open: boolean
  playlists:
    | Array<{
        name: string
        id: string
        images: Array<{
          url: string
          height: number | null
          width: number | null
        }>
      }>
    | undefined
    | undefined
  isSubmittable: boolean
}): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>('')
  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists)
  useEffect(() => {
    if (searchInput !== '') {
      setFilteredPlaylists(
        playlists?.filter((playlist) =>
          playlist.name.toLowerCase().includes(searchInput.toLowerCase()),
        ),
      )
    } else {
      setFilteredPlaylists(playlists)
    }
  }, [searchInput, playlists])
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
        style: {
          width: '100%',
          height: '100%',
          padding: '0rem',
        },
      }}
      slotProps={{
        paper: {
          style: {
            backgroundColor: '#27272a',
            color: 'white',
            maxHeight: '20rem',
            height: '20rem',
            width: '18rem',
            paddingLeft: '5px',
            paddingRight: '5px',
            paddingTop: '6px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          },
        },
      }}
    >
      <p className="text-spotify-subtext font-bold text-xs ml-2">
        {'Add To Playlist'}
      </p>
      <div className="flex flex-col h-[15rem] w-full px-2 pt-2">
        <div className="flex bg-spotify-item-hover rounded text-spotify-subtext h-fit w-full items-center py-1 px-1 gap-1">
          <SearchIcon className="text-2xl" />
          <input
            className="w-full focus:outline-none text-sm font-semibold bg-transparent"
            type="search"
            placeholder="Find a playlist"
            onChange={(e) => {
              setSearchInput(e.target.value)
            }}
            onKeyDown={(e) => {
              e.stopPropagation()
            }}
          />
        </div>
        <div className="flex flex-col h-[15rem] max-h-[15rem] w-full overflow-y-auto mt-2 gap-3">
          {filteredPlaylists?.map((playlist) => (
            <div
              key={playlist.id}
              className="flex items-center hover:bg-spotify-item-hover p-2 rounded-md justify-between"
            >
              <div className="flex gap-3 items-center w-fit h-full ">
                <Image
                  src={
                    playlist.images?.reduce((minImg, img) =>
                      img?.width !== null &&
                      img?.height !== null &&
                      minImg?.width !== null &&
                      minImg?.height !== null &&
                      img?.width * img?.height < minImg?.width * minImg?.height
                        ? img
                        : minImg,
                    ).url
                  }
                  alt={playlist.name}
                  width={45}
                  height={45}
                  className="rounded-md"
                />
                <p>{playlist.name}</p>
              </div>
              <button>
                <CheckCircleIcon className="text-spotify-color text-xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-[3rem] justify-end items-center px-5 gap-4">
        <button
          className="text-spotify-subtext rounded-full font-semibold py-1 hover:scale-105"
          onClick={() => {
            setSearchInput('')
            handleClose()
          }}
        >
          Cancel
        </button>
        {isSubmittable && (
          <button className="bg-white text-spotify-item-hover rounded-full font-semibold px-4 py-1 hover:scale-105">
            Done
          </button>
        )}
      </div>
    </Menu>
  )
}
