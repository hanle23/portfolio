'use client'
import { useEffect, useState } from 'react'
import SavedTracksHeader from './components/savedTracksHeader'
import SavedTracksItem from './components/savedTracksItem'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import type {
  PlaylistSummary,
  PlaylistResponse,
} from '@/app/types/spotify/playlist'
import PlaylistMenu from './components/playlistMenu'
import deletePlaylistItem from '../actions/deletePlaylistItem'
import addPlaylistItem from '../actions/addPlaylistItem'
import toast, { Toaster } from 'react-hot-toast'
import { VariableSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
export default function SavedTracksDetail({
  savedTracksFunc,
  playlists,
  distinctTracksInPlaylist,
  playlistsMutate,
  trackUrl,
  setTrackUrl,
}: {
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
  trackUrl: string
  setTrackUrl: (url: string) => void
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currTrackId, setCurrTrackId] = useState<string>('')
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
    trackId: string,
  ): void => {
    setAnchorEl(event.currentTarget)
    setCurrTrackId(trackId)
  }

  function handleSubmit(): void {
    for (const playlistId of playlistsToRemove) {
      const snapshotId = playlists?.find(
        (playlist) => playlist.id === playlistId,
      )?.snapshot_id
      const playlistName = playlists?.find(
        (playlist) => playlist.id === playlistId,
      )?.name
      const currTrackUri = `spotify:track:${currTrackId}`
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
      const currTrackUri = `spotify:track:${currTrackId}`
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
      !distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      !playlistsToAdd?.includes(playlistId)
    ) {
      setPlaylistsToAdd([...playlistsToAdd, playlistId])
    } else if (
      distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      !playlistsToRemove?.includes(playlistId)
    ) {
      setPlaylistsToRemove([...playlistsToRemove, playlistId])
    } else if (
      distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      playlistsToRemove?.includes(playlistId)
    ) {
      setPlaylistsToRemove(playlistsToRemove.filter((id) => id !== playlistId))
    } else if (
      !distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      playlistsToAdd?.includes(playlistId)
    ) {
      setPlaylistsToAdd(playlistsToAdd.filter((id) => id !== playlistId))
    }
  }

  const isChecked = (playlistId: string): boolean => {
    if (
      !distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      !playlistsToAdd.includes(playlistId)
    ) {
      return false
    } else if (
      distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      !playlistsToRemove.includes(playlistId)
    ) {
      return true
    } else if (
      distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      playlistsToRemove.includes(playlistId)
    ) {
      return false
    } else if (
      !distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
      playlistsToAdd.includes(playlistId)
    ) {
      return true
    }
    return false
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
        key={savedTracks[index].track.id}
        style={style}
        index={index}
        track={savedTracks[index]}
        handleAddToPlaylist={handleAddToPlaylist}
        distinctTracksInPlaylist={distinctTracksInPlaylist}
        trackUrl={trackUrl}
        setTrackUrl={setTrackUrl}
      />
    )
  }

  const handleClose = (): void => {
    setAnchorEl(null)
    setCurrTrackId('')
    setPlaylistsToAdd([])
    setPlaylistsToRemove([])
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
            >
              {Row}
            </List>
          )}
        </AutoSizer>
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
