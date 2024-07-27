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
  distinctTracksInPlaylist,
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
  distinctTracksInPlaylist: Record<string, string[]>
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

  const handleAddOrRemoveFromPlaylist = (playlistId: string): void => {
    if (
      !distinctTracksInPlaylist[currTrackUri].includes(playlistId) &&
      !playlistsToAdd.includes(playlistId)
    ) {
      setPlaylistsToAdd([...playlistsToAdd, playlistId])
    } else if (
      distinctTracksInPlaylist[currTrackUri].includes(playlistId) &&
      !playlistsToRemove.includes(playlistId)
    ) {
      setPlaylistsToRemove([...playlistsToRemove, playlistId])
    } else if (
      distinctTracksInPlaylist[currTrackUri].includes(playlistId) &&
      playlistsToRemove.includes(playlistId)
    ) {
      setPlaylistsToRemove(playlistsToRemove.filter((id) => id !== playlistId))
    } else if (
      !distinctTracksInPlaylist[currTrackUri].includes(playlistId) &&
      playlistsToAdd.includes(playlistId)
    ) {
      setPlaylistsToAdd(playlistsToAdd.filter((id) => id !== playlistId))
    }
  }

  const shouldShowSpotifyColor = (playlistId: string): boolean => {
    if (
      !distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      !playlistsToAdd.includes(playlistId)
    ) {
      return false
    } else if (
      distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      !playlistsToRemove.includes(playlistId)
    ) {
      return true
    } else if (
      distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      playlistsToRemove.includes(playlistId)
    ) {
      return false
    } else if (
      !distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      playlistsToAdd.includes(playlistId)
    ) {
      return true
    }
    return false
  }

  const handleClose = (): void => {
    setAnchorEl(null)
    setCurrTrackUri('')
    setPlaylistsToAdd([])
    setPlaylistsToRemove([])
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
            distinctTracksInPlaylist={distinctTracksInPlaylist}
          />
        ))}
        <PlaylistMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          playlists={playlists}
          open={open}
          isSubmittable={
            playlistsToAdd.length > 0 || playlistsToRemove.length > 0
          }
          currentTrackUri={currTrackUri}
          distinctTracksInPlaylist={distinctTracksInPlaylist}
          handleAddOrRemoveFromPlaylist={handleAddOrRemoveFromPlaylist}
          shouldShowSpotifyColor={shouldShowSpotifyColor}
        />
      </div>
    </div>
  )
}
