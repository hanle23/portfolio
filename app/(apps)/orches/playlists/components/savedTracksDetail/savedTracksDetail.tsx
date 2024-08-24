import SavedTracksHeader from './components/savedTracksHeader'
import SavedTracksItem from './components/savedTracksItem'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import type {
  PlaylistSummary,
  PlaylistResponse,
} from '@/app/types/spotify/playlist'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import toast, { Toaster } from 'react-hot-toast'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import type { TrackPlaylists } from '@/app/types/spotify/track'
import InfiniteLoader from 'react-window-infinite-loader'
import { LIMIT } from '@/constants/spotify/savedTracks'

interface SavedTracksDetailProps {
  savedTracksFunc: {
    savedTracks: SavedTracks[]
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
  audioFeatures: Record<string, number | AudioFeaturesObject>
}

export default function SavedTracksDetail({
  savedTracksFunc,
  playlists,
  distinctTracksInPlaylist,
  playlistsMutate,
  trackUrl,
  setTrackUrl,
  setDistinctTracksInPlaylist,
  audioFeatures,
}: SavedTracksDetailProps): JSX.Element {
  const savedTracks =
    savedTracksFunc?.savedTracks?.flatMap(
      (trackPage: SavedTracks) => trackPage.items,
    ) ?? []

  const isItemLoaded = (index: number): boolean => {
    if (savedTracksFunc?.savedTracks?.length === 0) {
      return false
    }
    if (
      savedTracksFunc?.savedTracksIsLoading ||
      savedTracksFunc?.savedTracksIsValidating
    ) {
      return false
    }
    if (
      savedTracksFunc?.savedTracks?.[0].total !== undefined &&
      index < savedTracksFunc?.savedTracks?.[0].total
    ) {
      return false
    }

    return true
  }

  const loadMoreItems = async (
    startIndex: number,
    endIndex: number,
  ): Promise<void> => {
    try {
      if (
        savedTracksFunc?.savedTracksIsLoading ||
        savedTracksFunc?.savedTracksIsValidating
      ) {
        return
      }
      if (
        endIndex > savedTracksFunc?.savedTracks?.length * LIMIT - LIMIT &&
        savedTracks.length < savedTracksFunc?.savedTracks?.[0].total
      ) {
        await savedTracksFunc?.savedTracksSetNextPage()
      }
    } catch (error) {
      console.log('Failed to load more items: ', error)
      toast.error('Failed to load more tracks. Please try again.')
    }
  }

  const Row = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties | undefined
  }): JSX.Element => {
    return (
      <SavedTracksItem
        key={savedTracks[index]?.track?.id}
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
        audioFeatures={audioFeatures}
      />
    )
  }

  return (
    <div className="flex flex-col h-full w-full">
      <SavedTracksHeader total={savedTracksFunc?.savedTracks?.[0]?.total} />
      <div className="flex flex-col h-full w-full space-y-3 pt-3">
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={
                savedTracksFunc?.savedTracks !== undefined &&
                savedTracksFunc?.savedTracks.length > 0
                  ? savedTracksFunc?.savedTracks?.[0].total
                  : savedTracks.length
              }
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={height}
                  itemCount={
                    savedTracksFunc?.savedTracks !== undefined &&
                    savedTracksFunc?.savedTracks.length > 0
                      ? savedTracksFunc?.savedTracks?.[0].total
                      : savedTracks.length
                  }
                  itemSize={() => 60}
                  width={width}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {Row}
                </List>
              )}
            </InfiniteLoader>
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
