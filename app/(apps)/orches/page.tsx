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
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'
import PlaylistPage from './playlists/playlistsPage'

export default function Page({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const { data: session, status } = useSession()
  const [currentRoute, setCurrentRoute] = useState<string>('playlists')
  const [allItemsFetched, setAllItemsFetched] = useState<boolean>(false)
  const [currPlaylist, setCurrPlaylist] =
    useState<SimplifiedPlaylistObject | null>(null)
  const trackAudio = useRef(
    typeof Audio !== 'undefined' ? new Audio() : undefined,
  )
  const pathname = usePathname()
  const {
    data,
    setNextPage,
    isLoading: savedTracksIsLoading,
    mutate: savedTracksMutate,
    isValidating,
  } = useFetchSavedTracks(
    fetcher,
    session?.user?.access_token,
    setAllItemsFetched,
  )

  const { data: playlists } = useDetailedPlaylists(session?.user?.access_token)

  const savedTracksFunc = useMemo(
    () => ({
      data,
      setNextPage,
      savedTracksIsLoading,
      savedTracksMutate,
      isValidating,
    }),
    [data, setNextPage, savedTracksIsLoading, savedTracksMutate, isValidating],
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

  useEffect(() => {
    if (data === undefined || playlists === undefined || allItemsFetched) {
      return
    }
    if (data?.length === 0 || playlists?.length === 0) {
      return
    }
    const fetchLimit = Math.ceil(data[0].total / data[0].limit)
    if (data?.length === fetchLimit) {
      const updatedTracks = UpdateTracksWithPlaylistStatus(playlists, data)
      savedTracksMutate(updatedTracks, { revalidate: false }).catch((e) => {
        console.log('error occurs')
      })
      setAllItemsFetched(true)
    }
  }, [data, playlists, savedTracksMutate, allItemsFetched])

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
