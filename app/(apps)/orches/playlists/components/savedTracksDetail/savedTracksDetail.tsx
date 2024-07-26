'use client'
import { useEffect, useState } from 'react'
import SavedTracksHeader from './components/savedTracksHeader'
import SavedTracksItem from './components/savedTracksItem'
import type {
  SavedTracks,
  SavedTracksObject,
} from '@/app/types/spotify/savedTracks'
import type { PlaylistSummary } from '@/app/types/spotify/playlist'
import PlaylistMenu from './components/playlistMenu'
export default function SavedTracksDetail({
  trackAudio,
  savedTracksFunc,
  playlists,
}: {
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
  savedTracksFunc: {
    savedTracks: SavedTracks[] | undefined
    savedTracksSetNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    savedTracksMutate: () => void
    savedTracksIsValidating: boolean
  }
  playlists: PlaylistSummary[] | undefined | undefined
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currTrackUri, setCurrTrackUri] = useState<string>('')
  const [playlistsToAdd, setPlaylistsToAdd] = useState<string[]>([])
  const [playlistsToRemove, setPlaylistsToRemove] = useState<string[]>([])
  const open = Boolean(anchorEl)
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
  const handleAddToPlaylist = (
    event: React.MouseEvent<HTMLButtonElement>,
    trackUri: string,
  ): void => {
    setAnchorEl(event.currentTarget)
    setCurrTrackUri(trackUri)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
    setCurrTrackUri('')
  }
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto overscroll-none">
      <SavedTracksHeader total={savedTracksFunc?.savedTracks?.[0]?.total} />
      <div className="flex flex-col h-full w-full space-y-3 pt-3">
        {savedTracks?.map((track: SavedTracksObject, index: number) => (
          <SavedTracksItem
            key={track.track.id}
            index={index}
            track={track}
            trackAudio={trackAudio}
            handleAddToPlaylist={handleAddToPlaylist}
          />
        ))}
        <PlaylistMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          playlists={playlists}
          open={open}
          isSubmittable={
            playlistsToAdd.length > 0 && playlistsToRemove.length > 0
          }
        />
      </div>
    </div>
  )
}
