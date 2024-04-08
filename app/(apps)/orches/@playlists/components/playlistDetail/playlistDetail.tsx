'use client'
import React, { useContext } from 'react'
import useSWRInfinite from 'swr/infinite'
import PlaylistHeader from './playlistHeader'
import { OrchesContext } from '../../../components/appWrapper'
import InfiniteLoaderComponent from './InfinityLoader'
import { FixedSizeList as List } from 'react-window'
import TrackItem from './trackItem'

export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  const context = useContext(OrchesContext)
  const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  const getKey = (pageIndex: number, previousPageData: any): string | null => {
    if (previousPageData !== null && previousPageData.next === null) return null
    if (pageIndex === 0) return `/api/spotify/playlists/${playlist.id}?offset=0`
    return `/api/spotify/playlists/${playlist.id}?offset=${
      previousPageData?.limit + previousPageData?.offset
    }`
  }
  const { data, size, setSize } = useSWRInfinite<Playlists>(getKey, fetcher)

  const items = data?.flatMap((trackPage) => trackPage.items) ?? []
  const itemCount = data?.[data?.length - 1]?.total ?? 0
  const isItemLoaded = (index: number): boolean => items[index] !== undefined
  const hasNextPage = data?.[data?.length - 1]?.next !== null
  const loadMoreItems = hasNextPage
    ? async () => await setSize(size + 1)
    : async () => {
        await Promise.resolve()
      }

  return (
    <div className="relative w-full h-full flex overflow-y-auto">
      <InfiniteLoaderComponent
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isItemLoaded}
      >
        {({ onItemsRendered, ref }) => (
          <div className="flex flex-col w-full h-full">
            <PlaylistHeader
              playlist={playlist}
              setCurrPlaylist={setCurrPlaylist}
            />
            <List
              onItemsRendered={onItemsRendered}
              itemCount={itemCount}
              ref={ref}
              height={500}
              width="100%"
              itemSize={50}
              style={{ height: '100%' }}
            >
              {({ index, style }) => (
                <TrackItem
                  index={index}
                  style={style}
                  isItemLoaded={isItemLoaded}
                  track={items[index]}
                />
              )}
            </List>
          </div>
        )}
      </InfiniteLoaderComponent>
    </div>
  )
}
