'use client'
import { useEffect, useState } from 'react'
import SavedTracksHeader from './components/savedTracksHeader'
import SavedTracksItem from './components/savedTracksItem'
import type {
  SavedTracks,
  SavedTracksObject,
} from '@/app/types/spotify/savedTracks'
import type {
  PlaylistSummary,
  PlaylistResponse,
} from '@/app/types/spotify/playlist'
import PlaylistMenu from './components/playlistMenu'
import deletePlaylistItem from '../actions/deletePlaylistItem'
import addPlaylistItem from '../actions/addPlaylistItem'
import toast, { Toaster } from 'react-hot-toast'
export default function SavedTracksDetail({
  trackAudio,
  savedTracksFunc,
  playlists,
  distinctTracksInPlaylist,
  playlistsMutate,
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
  playlistsMutate: () => Promise<PlaylistResponse[] | undefined>
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

  function handleSubmit(): void {
    for (const playlistId of playlistsToRemove) {
      const snapshotId = playlists?.find(
        (playlist) => playlist.id === playlistId,
      )?.snapshot_id
      const playlistName = playlists?.find(
        (playlist) => playlist.id === playlistId,
      )?.name
      if (snapshotId === undefined) {
        continue
      }
      deletePlaylistItem(currTrackUri, playlistId, snapshotId)
        .then((res) => {
          if (res.status === 200) {
            toast.success(
              `Successfully removed track from playlist ${playlistName}`,
            )
          } else {
            toast.error(
              `Unable to remove track from playlist, please try again later`,
            )
          }
        })
        .catch((e: any) => {
          console.log(e)
        })
    }

    for (const playlistId of playlistsToAdd) {
      const playlistName = playlists?.find(
        (playlist) => playlist.id === playlistId,
      )?.name
      addPlaylistItem(currTrackUri, playlistId)
        .then((res) => {
          if (res.status === 201) {
            toast.success(
              `Successfully added track to playlist ${playlistName}`,
            )
          } else {
            toast.error(
              `Unable to add track to playlist, please try again later`,
            )
          }
        })
        .catch((e: any) => {
          console.log(e)
        })
    }
    if (playlistsToAdd.length > 0 || playlistsToRemove.length > 0) {
      playlistsMutate().catch((e: any) => {
        console.log(e)
      })
      handleClose()
    }
  }

  const handleAddOrRemoveFromPlaylist = (playlistId: string): void => {
    if (
      !distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      !playlistsToAdd?.includes(playlistId)
    ) {
      setPlaylistsToAdd([...playlistsToAdd, playlistId])
    } else if (
      distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      !playlistsToRemove?.includes(playlistId)
    ) {
      setPlaylistsToRemove([...playlistsToRemove, playlistId])
    } else if (
      distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      playlistsToRemove?.includes(playlistId)
    ) {
      setPlaylistsToRemove(playlistsToRemove.filter((id) => id !== playlistId))
    } else if (
      !distinctTracksInPlaylist[currTrackUri]?.includes(playlistId) &&
      playlistsToAdd?.includes(playlistId)
    ) {
      setPlaylistsToAdd(playlistsToAdd.filter((id) => id !== playlistId))
    }
  }

  const isChecked = (playlistId: string): boolean => {
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
          handleAddOrRemoveFromPlaylist={handleAddOrRemoveFromPlaylist}
          isChecked={isChecked}
          handleSubmit={handleSubmit}
        />
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
