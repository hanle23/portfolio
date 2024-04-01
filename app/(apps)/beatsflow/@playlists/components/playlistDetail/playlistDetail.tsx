'use client'
import React, { useContext } from 'react'
import useSWRInfinite from 'swr/infinite'
import PlaylistHeader from './playlistHeader'
import TracksTable from './tracksTable'
import { BeatsflowContext } from '../../../components/appWrapper'
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
  const { data, size, setSize } = useSWRInfinite<Playlists>(getKey, fetcher)
  console.log(data)
  return (
    <div className="relative w-full h-full flex flex-col overflow-y-auto">
      <PlaylistHeader playlist={playlist} setCurrPlaylist={setCurrPlaylist} />
      <div className="flex flex-col grow">
        <div className="grow">
          <TracksTable
            allTrackPages={data}
            hasNextPage={data?.[data?.length - 1]?.next !== null}
            setSize={setSize}
            size={size}
            totalItems={data?.[data?.length - 1]?.total ?? 0}
          />
        </div>
      </div>
    </div>
  )
}
