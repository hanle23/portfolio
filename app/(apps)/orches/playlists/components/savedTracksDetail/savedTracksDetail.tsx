'use client'
import { useEffect } from 'react'
import SavedTracksHeader from './components/savedTracksHeader'
import SavedTracksItem from './components/savedTracksItem'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import type {
  PlaylistSummary,
  PlaylistResponse,
} from '@/app/types/spotify/playlist'
import toast, { Toaster } from 'react-hot-toast'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import type { TrackPlaylists } from '@/app/types/spotify/track'

interface SavedTracksDetailProps {
  savedTracksFunc: {
    savedTracks: SavedTracks[] | undefined
    savedTracksSetNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    savedTracksMutate: () => Promise<SavedTracks[] | undefined>
    savedTracksIsValidating: boolean
  }
  playlists: PlaylistSummary[] | undefined | undefined
  distinctTracksInPlaylist: Record<string, string[]>
  playlistsMutate: () => Promise<PlaylistResponse[] | undefined>
  trackUrl: string
  setTrackUrl: (url: string) => void
  setDistinctTracksInPlaylist: React.Dispatch<
    React.SetStateAction<TrackPlaylists>
  >
}

export default function SavedTracksDetail({
  savedTracksFunc,
  playlists,
  distinctTracksInPlaylist,
  playlistsMutate,
  trackUrl,
  setTrackUrl,
  setDistinctTracksInPlaylist,
}: SavedTracksDetailProps): JSX.Element {
  const savedTracks =
    savedTracksFunc?.savedTracks?.flatMap(
      (trackPage: SavedTracks) => trackPage.items,
    ) ?? []
  useEffect(() => {
    if (
      !savedTracksFunc?.savedTracksIsLoading &&
      !savedTracksFunc?.savedTracksIsValidating
    )
      savedTracksFunc?.savedTracksSetNextPage().catch((e: any) => {
        console.log(e)
      })
  }, [
    savedTracksFunc,
    savedTracksFunc?.savedTracksSetNextPage,
    savedTracksFunc?.savedTracksIsValidating,
    savedTracksFunc?.savedTracksIsLoading,
  ])

  // const isItemLoaded = (index: number): boolean => {
  //   return (
  //     (!savedTracksFunc?.savedTracksIsLoading &&
  //       !savedTracksFunc?.savedTracksIsValidating) ||
  //     index < savedTracks.length
  //   )
  // }

  // const loadMoreItems = async (
  //   startIndex: number,
  //   endIndex: number,
  // ): Promise<void> => {
  //   try {
  //     await savedTracksFunc?.savedTracksSetNextPage()
  //   } catch (error) {
  //     console.log('Failed to load more items: ', error)
  //     toast.error('Failed to load more tracks. Please try again.')
  //   }
  // }

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties | undefined
  }): JSX.Element => {
    return (
      <SavedTracksItem
        key={savedTracks[index].track.id}
        style={style}
        index={index}
        track={savedTracks[index]}
        distinctTracksInPlaylist={distinctTracksInPlaylist}
        trackUrl={trackUrl}
        setTrackUrl={setTrackUrl}
        playlists={playlists}
        toast={toast}
        playlistsMutate={playlistsMutate}
        setDistinctTracksInPlaylist={setDistinctTracksInPlaylist}
      />
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <SavedTracksHeader total={savedTracksFunc?.savedTracks?.[0]?.total} />
      <div className="flex flex-col h-full w-full space-y-3 pt-3">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={savedTracks.length}
              itemSize={() => 60}
              width={width}
              // ref={ref}
              // onItemsRendered={onItemsRendered}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4500,
          style: {
            background: '#27272a',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}
