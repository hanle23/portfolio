'use client'
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import SideBar from './components/sideBar'
import { Header } from './components/header'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Login from './components/auth/login'
import useFetchSavedTracks from './components/actions/useFetchSavedTracks'
import useDetailedPlaylists from './components/actions/useDetailPlaylist'
import fetcher from './components/actions/helper/fetchFunction'
import UpdateTracksWithPlaylistStatus from './components/actions/helper/updateTracksWithPlaylistStatus'
import type {
  UserPlaylistResponse,
  SimplifiedPlaylistObject,
} from '@/app/types/spotify/playlist'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import PlaylistPage from './playlists/playlistsPage'

export default function Page({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const { data: session, status } = useSession()
  const [currentRoute, setCurrentRoute] = useState<string>('playlists')
  const [playlists, setPlaylists] = useState<UserPlaylistResponse[]>([])
  const [savedTracks, setSavedTracks] = useState<SavedTracks[]>([])
  const [distinctPlaylist, setDistinctPlaylist] = useState<
    Array<{ id: string; title: string }>
  >([])
  const [currPlaylist, setCurrPlaylist] =
    useState<SimplifiedPlaylistObject | null>(null)
  const trackAudio = useRef(
    typeof Audio !== 'undefined' ? new Audio() : undefined,
  )
  const pathname = usePathname()
  const {
    data: savedTrackRes,
    setNextPage,
    isLoading: savedTracksIsLoading,
    mutate: savedTracksMutate,
    isValidating,
  } = useFetchSavedTracks(fetcher, session?.user?.access_token)

  const { data: playlistRes } = useDetailedPlaylists(
    session?.user?.access_token,
  )

  useEffect(() => {
    if (playlistRes !== null && playlistRes !== undefined) {
      setPlaylists((prevTracks) => {
        if (prevTracks?.length === 0) {
          return playlistRes
        }
        const filteredTracks = playlistRes.filter(
          (playlist) =>
            !prevTracks.some(
              (prevTrack) =>
                prevTrack.href === playlist.href ||
                prevTrack.offset === playlist.offset,
            ),
        )
        return [...prevTracks, ...filteredTracks]
      })
    }

    if (savedTrackRes !== null && savedTrackRes !== undefined) {
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
  }, [playlistRes, savedTrackRes])

  const savedTracksFunc = useMemo(
    () => ({
      savedTracks,
      setNextPage,
      savedTracksIsLoading,
      savedTracksMutate,
      isValidating,
    }),
    [
      savedTracks,
      setNextPage,
      savedTracksIsLoading,
      savedTracksMutate,
      isValidating,
    ],
  )

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
    <>
      {session === undefined || status !== 'authenticated' ? (
        <Login />
      ) : (
        <div className="h-full w-full bg-spotify-background text-white">
          <Header />
          <div className="flex gap-8 w-full h-full pt-16 p-3 justify-center">
            {pathname !== '/orches/profile' ? (
              <>
                <SideBar
                  currentRoute={currentRoute}
                  setCurrentRoute={setCurrentRoute}
                  playlists={playlists}
                  currPlaylist={currPlaylist}
                  setCurrPlaylist={handleSetCurrPlaylist}
                />
                <div className="flex rounded-lg shrink-0 w-4/6 h-full bg-container overflow-hidden">
                  <PlaylistPage
                    currPlaylist={currPlaylist}
                    handleSetCurrPlaylist={handleSetCurrPlaylist}
                    trackAudio={trackAudio}
                    savedTracksFunc={savedTracksFunc}
                    playlists={playlists?.map(({ name, id, images }) => ({
                      name,
                      id,
                      images,
                    }))}
                  />
                </div>
              </>
            ) : (
              <div className="flex rounded-lg shrink-0 w-4/6 h-full bg-container overflow-hidden">
                {children}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
