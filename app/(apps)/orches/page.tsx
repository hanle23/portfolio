'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import SideBar from './components/sideBar'
import { useSession } from 'next-auth/react'
import useFetchSavedTracks from './components/actions/useFetchSavedTracks'
import useFetchPlaylist from './components/actions/useFetchPlaylist'
import fetcher from './components/actions/helper/fetchFunction'
import UpdateTracksWithPlaylistStatus from './components/actions/helper/updateTracksWithPlaylistStatus'
import type {
  PlaylistResponse,
  SimplifiedPlaylistObject,
} from '@/app/types/spotify/playlist'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import PlaylistPage from './playlists/playlistsPage'
import { LIMIT as PLAYLIST_LIMIT } from '@/constants/spotify/playlist'
import { LIMIT as SAVEDTRACK_LIMIT } from '@/constants/spotify/savedTracks'

export default function Page(): React.JSX.Element {
  const { data: session } = useSession()
  const [currentRoute, setCurrentRoute] = useState<string>('playlists')
  const [playlistsRes, setPlaylists] = useState<PlaylistResponse[]>([])
  const [savedTracks, setSavedTracks] = useState<SavedTracks[]>([])
  const [distinctPlaylist, setDistinctPlaylist] = useState<
    Array<{
      name: string
      id: string
      images: Array<{
        url: string
        height: number | null
        width: number | null
      }>
    }>
  >([])
  const [currPlaylist, setCurrPlaylist] =
    useState<SimplifiedPlaylistObject | null>(null)
  const trackAudio = useRef(
    typeof Audio !== 'undefined' ? new Audio() : undefined,
  )
  const {
    data: savedTrackRes,
    setNextPage: savedTracksSetNextPage,
    isLoading: savedTracksIsLoading,
    mutate: savedTracksMutate,
    isValidating: savedTracksIsValidating,
  } = useFetchSavedTracks(fetcher, session?.user?.access_token)

  const {
    data: playlistRes,
    setNextPage: playlistsSetNextPage,
    isLoading: playlistsIsLoading,
    mutate: playlistsMutate,
    isValidating: playlistsIsValidating,
  } = useFetchPlaylist(fetcher, session?.user?.access_token)

  useEffect(() => {
    if (
      playlistRes !== null &&
      playlistRes !== undefined &&
      Math.ceil((playlistRes.length * PLAYLIST_LIMIT) / PLAYLIST_LIMIT) + 1 >
        playlistRes.length
    ) {
      const filteredPlaylistRes = playlistRes?.map((playlistResponse) => ({
        ...playlistResponse,
        items: playlistResponse?.items?.filter(
          (playlist) => playlist?.owner?.display_name === session?.user?.name,
        ),
      }))
      setPlaylists((prevPlaylists) => {
        if (prevPlaylists?.length === 0) {
          return filteredPlaylistRes
        }
        const filteredPlaylists = filteredPlaylistRes?.filter(
          (playlist) =>
            !prevPlaylists.some(
              (prevPlaylist) =>
                prevPlaylist.href === playlist.href ||
                prevPlaylist.offset === playlist.offset,
            ),
        )
        return [...prevPlaylists, ...filteredPlaylists]
      })
      setDistinctPlaylist(() => {
        return filteredPlaylistRes.flatMap((playlistRes) =>
          playlistRes.items.map((playlist) => ({
            id: playlist.id,
            name: playlist.name,
            images: playlist.images,
          })),
        )
      })
    }

    if (
      savedTrackRes !== null &&
      savedTrackRes !== undefined &&
      Math.ceil((savedTrackRes.length * SAVEDTRACK_LIMIT) / SAVEDTRACK_LIMIT) +
        1 >
        savedTrackRes.length
    ) {
      setSavedTracks((prevTracks) => {
        if (prevTracks?.length === 0) {
          return savedTrackRes
        }
        const filteredTracks = savedTrackRes.filter(
          (savedTrack) =>
            !prevTracks.some(
              (prevTrack) =>
                prevTrack.href === savedTrack.href ||
                prevTrack.offset === savedTrack.offset,
            ),
        )
        return [...prevTracks, ...filteredTracks]
      })
    }
  }, [playlistRes, savedTrackRes, session?.user?.name])

  useEffect(() => {
    if (!playlistsIsLoading && !playlistsIsValidating)
      playlistsSetNextPage().catch((e: any) => {
        console.log(e)
      })
  }, [playlistsSetNextPage, playlistsIsValidating, playlistsIsLoading])

  const savedTracksFunc = {
    savedTracks,
    savedTracksSetNextPage,
    savedTracksIsLoading,
    savedTracksMutate,
    savedTracksIsValidating,
  }

  const playlistsFunc = {
    playlistsRes,
    playlistsMutate,
  }

  const handleSetCurrPlaylist = useCallback(
    (playlist: SimplifiedPlaylistObject | null): void => {
      if (trackAudio?.current !== undefined) {
        trackAudio.current.currentTime = 0
        trackAudio.current.pause()
      }
      setCurrPlaylist(playlist)
    },
    [trackAudio],
  )

  // useEffect(() => {
  //   if (savedTracks === undefined || playlists === undefined) {
  //     return
  //   }
  //   if (savedTracks?.length === 0 || playlists?.length === 0) {
  //     return
  //   }
  //   const fetchLimit = Math.ceil(savedTracks[0].total / savedTracks[0].limit)
  //   if (savedTracks?.length === fetchLimit) {
  //     const updatedTracks = UpdateTracksWithPlaylistStatus(
  //       playlists,
  //       savedTracks,
  //     )
  //   }
  // }, [savedTracks, playlists])

  return (
    <div className="flex gap-8 w-full h-full pt-16 p-3 justify-center">
      <SideBar
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        playlistsRes={playlistsRes}
        currPlaylist={currPlaylist}
        setCurrPlaylist={handleSetCurrPlaylist}
      />
      <div className="flex rounded-lg shrink-0 w-4/6 h-full bg-container overflow-hidden">
        <PlaylistPage
          currPlaylist={currPlaylist}
          handleSetCurrPlaylist={handleSetCurrPlaylist}
          trackAudio={trackAudio}
          savedTracksFunc={savedTracksFunc}
          playlists={distinctPlaylist}
        />
      </div>
    </div>
  )
}
