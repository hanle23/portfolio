'use client'
import React, { useContext } from 'react'
import useSWRInfinite from 'swr/infinite'
import PlaylistHeader from './playlistHeader'
import { BeatsflowContext } from '../../../components/appWrapper'
import Pagination from '../../../components/pagination'
export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  const context = useContext(BeatsflowContext)
  const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  const getKey = (pageIndex: number, previousPageData: any): string | null => {
    if (previousPageData !== null && previousPageData.next === null) return null
    if (pageIndex === 0) return `/api/spotify/playlists/${playlist.id}?offset=0`
    return `/api/spotify/playlists/${playlist.id}?offset=${
      previousPageData?.limit + previousPageData?.offset
    }`
  }
  const { data, setSize } = useSWRInfinite(getKey, fetcher)
  console.log(data[data?.length - 1])
  return (
    <div className="relative w-full h-full flex flex-col overflow-y-auto">
      <PlaylistHeader playlist={playlist} setCurrPlaylist={setCurrPlaylist} />
      <div className="flex flex-col grow">
        <div className="grow">
          <TracksTable />
        </div>
        <Pagination
          className="flex justify-center absolute bottom-0 left-0 w-full space-x-3 bg-transparent"
          total={Math.ceil(playlist.tracks.total / 50)}
          initialPage={1}
          onChange={(page) => {
            setSize(page).catch((e) => {
              console.log(e)
            })
          }}
        />
      </div>
    </div>
  )
}

function TracksTable({ tracks }: { tracks: PlaylistItem }): React.JSX.Element {
  return <div></div>
}
