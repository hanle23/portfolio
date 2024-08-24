'use client'
import Tooltip from '@mui/material/Tooltip'
import Image from 'next/image'
import React, { useCallback, useState, useMemo } from 'react'
import MediaPreviewButton from '../../../../components/mediaPreviewButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import type {
  PlaylistSummary,
  PlaylistResponse,
} from '@/app/types/spotify/playlist'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { TrackPlaylists } from '@/app/types/spotify/track'
import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import PlaylistMenu from './playlistMenu'
import deletePlaylistItem from '../../actions/deletePlaylistItem'
import addPlaylistItem from '../../actions/addPlaylistItem'
import updateDistinctTracks from '@/app/(apps)/orches/components/actions/helper/updateDistinctTracks'
import IsExistInPlaylist from './actions/isExistInPlaylist'

interface SavedTracksItemProps {
  index: number
  track: SavedTracksObject
  distinctTracksInPlaylist: Record<string, string[]>
  style: React.CSSProperties | undefined
  trackUrl: string
  playlists: PlaylistSummary[] | undefined
  setTrackUrl: (url: string) => void
  playlistsMutate: () => Promise<PlaylistResponse[] | undefined>
  toast: any
  setDistinctTracksInPlaylist: React.Dispatch<
    React.SetStateAction<TrackPlaylists>
  >
  audioFeatures: Record<string, number | AudioFeaturesObject>
}
export default function SavedTracksItem({
  index,
  track,
  distinctTracksInPlaylist,
  style,
  trackUrl,
  setTrackUrl,
  playlists,
  toast,
  playlistsMutate,
  setDistinctTracksInPlaylist,
  audioFeatures,
}: SavedTracksItemProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currTrackId, setCurrTrackId] = useState<string>('')
  const [playlistsToAdd, setPlaylistsToAdd] = useState<string[]>([])
  const [playlistsToRemove, setPlaylistsToRemove] = useState<string[]>([])
  const open = Boolean(anchorEl)
  const handleAddToPlaylist = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, trackId: string) => {
      setAnchorEl(event.currentTarget)
      setCurrTrackId(trackId)
    },
    [],
  )
  const smallestImage = useMemo(
    () =>
      track?.track?.album?.images?.reduce((minImg, img) =>
        img?.width * img?.height < minImg?.width * minImg?.height
          ? img
          : minImg,
      ),
    [track?.track?.album?.images],
  )
  const handleClose = useCallback(() => {
    setAnchorEl(null)
    setCurrTrackId('')
    setPlaylistsToAdd([])
    setPlaylistsToRemove([])
  }, [])

  const handleSubmit = useCallback(async (): Promise<void> => {
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
      const oldState = distinctTracksInPlaylist
      updateDistinctTracks(
        currTrackId,
        playlistsToAdd,
        playlistsToRemove,
        distinctTracksInPlaylist,
        setDistinctTracksInPlaylist,
      )
      await playlistsMutate().catch((e: any) => {
        setDistinctTracksInPlaylist(oldState)
        console.log(e)
      })

      handleClose()
    }
  }, [
    currTrackId,
    handleClose,
    playlists,
    playlistsMutate,
    playlistsToAdd,
    playlistsToRemove,
    toast,
    distinctTracksInPlaylist,
    setDistinctTracksInPlaylist,
  ])

  const handleAddOrRemoveFromPlaylist = useCallback(
    (playlistId: string): void => {
      if (
        IsExistInPlaylist(
          playlistId,
          distinctTracksInPlaylist,
          currTrackId,
          playlistsToAdd,
          playlistsToRemove,
        )
      ) {
        setPlaylistsToRemove([...playlistsToRemove, playlistId])
      } else {
        setPlaylistsToAdd([...playlistsToAdd, playlistId])
      }
    },
    [currTrackId, distinctTracksInPlaylist, playlistsToAdd, playlistsToRemove],
  )

  const memoizedPlaylistMenu = useMemo(
    () => (
      <PlaylistMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        playlists={playlists}
        open={open}
        currTrackId={currTrackId}
        isSubmittable={
          playlistsToAdd.length > 0 || playlistsToRemove.length > 0
        }
        handleAddOrRemoveFromPlaylist={handleAddOrRemoveFromPlaylist}
        isChecked={(playlistId: string) => {
          return IsExistInPlaylist(
            playlistId,
            distinctTracksInPlaylist,
            currTrackId,
            playlistsToAdd,
            playlistsToRemove,
          )
        }}
        handleSubmit={handleSubmit}
        audioFeatures={audioFeatures}
      />
    ),
    [
      anchorEl,
      handleClose,
      playlists,
      open,
      playlistsToAdd,
      playlistsToRemove,
      handleAddOrRemoveFromPlaylist,
      handleSubmit,
      currTrackId,
      distinctTracksInPlaylist,
      audioFeatures,
    ],
  )

  return (
    <div
      key={track?.track?.id}
      style={style}
      className="group grid grid-cols-12 gap-4 py-1 border overflow-hidden relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
    >
      <div className="col-span-1 flex justify-end text-spotify-subtext items-center">
        <MediaPreviewButton
          className="group-hover:block"
          currTrackUrl={track?.track?.preview_url}
          trackUrl={trackUrl}
          setTrackUrl={setTrackUrl}
        />

        <p className="mr-2 group-hover:hidden">{index + 1}</p>
      </div>
      <div className="col-span-6 lg:col-span-4 flex justify-start items-center gap-3">
        <div className="flex shrink-0 h-full w-12">
          {Object.keys(distinctTracksInPlaylist).length === 0 ||
          (track?.track?.id in distinctTracksInPlaylist &&
            distinctTracksInPlaylist[track?.track?.id].length !== 0) ? (
            <Image
              src={smallestImage?.url}
              alt=""
              width={smallestImage?.width < 64 ? 64 : smallestImage?.width}
              height={smallestImage?.height < 64 ? 64 : smallestImage?.height}
              className="w-auto h-auto rounded-md "
            />
          ) : (
            <Tooltip
              title={`${track?.track?.name} is not in any playlist`}
              placement="left-start"
              arrow
              leaveDelay={100}
            >
              <Image
                src={smallestImage?.url}
                alt=""
                width={smallestImage?.width < 64 ? 64 : smallestImage?.width}
                height={smallestImage?.height < 64 ? 64 : smallestImage?.height}
                className="w-auto h-auto rounded-md border-2 border-spotify-color"
              />
            </Tooltip>
          )}
        </div>

        <div className="grid">
          <a
            href={track?.track?.external_urls?.spotify}
            target="_blank"
            className="truncate"
          >
            {track?.track?.name !== undefined
              ? track?.track?.name
              : 'Loading...'}
          </a>
          <span className="truncate text-sm text-spotify-subtext">
            {track?.track?.artists.map((artist, index) => (
              <React.Fragment key={artist.id}>
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {artist.name}
                </a>{' '}
                {index < track?.track?.artists.length - 1 && ', '}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>

      <div className="col-span-3">
        <p className="truncate items-center text-spotify-subtext text-sm text-left h-full w-full flex">
          {track?.track?.album.name}
        </p>
      </div>

      <div className="hidden lg:flex lg:col-span-2">
        <p className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {new Date(track?.added_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-between">
        <button
          className="group-hover:opacity-100 opacity-0 hover:text-spotify-color"
          onClick={(event) => {
            handleAddToPlaylist(event, track?.track?.id)
          }}
        >
          <AddCircleOutlineIcon />
        </button>

        <p className="truncate items-center text-spotify-subtext text-sm justify-center h-full w-full flex">
          {Math.floor(track?.track?.duration_ms / 60000)}:
          {((track?.track?.duration_ms % 60000) / 1000)
            .toFixed(0)
            .padStart(2, '0')}
        </p>
        <button className="group-hover:opacity-100 opacity-0 hover:text-spotify-color">
          <MoreHorizIcon />
        </button>
      </div>
      {memoizedPlaylistMenu}
    </div>
  )
}
