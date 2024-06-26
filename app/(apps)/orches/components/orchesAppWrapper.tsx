'use client'
import React, { createContext, useState, useRef, useEffect } from 'react'
import SideBar from './sideBar'
import { Header } from './header'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Login from './auth/login'
import useFetchSavedTracks from './actions/useFetchSavedTracks'
import useDetailedPlaylists from './actions/useDetailPlaylist'
import fetcher from './actions/helper/fetchFunction'
import UpdateTracksWithPlaylistStatus from './actions/helper/updateTracksWithPlaylistStatus'

import type {
  SavedTracks,
  AuthUser,
  DetailsPlaylistItem,
} from '@/app/types/types'

export interface OrchesContextType {
  currPlaylist: DetailsPlaylistItem | null
  setCurrPlaylist: React.Dispatch<
    React.SetStateAction<DetailsPlaylistItem | null>
  >
  playlists: DetailsPlaylistItem[] | undefined
  currentTrack: string | null
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
  savedTracksFunc: {
    data: SavedTracks[] | undefined
    setNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    savedTracksMutate: () => void
    isValidating: boolean
  }
}

export const OrchesContext = createContext<OrchesContextType | null>(null)

export default function OrchesAppWrapper({
  children,
  allRoutes,
}: {
  children: React.ReactNode
  allRoutes: Array<{ node: React.ReactNode; value: string; label: string }>
}): React.JSX.Element {
  const { data: session, status } = useSession()
  const [currentRoute, setCurrentRoute] = useState<string>('playlists')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [currPlaylist, setCurrPlaylist] = useState<DetailsPlaylistItem | null>(
    null,
  )
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
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
  } = useFetchSavedTracks(fetcher, accessToken)

  const { data: playlists } = useDetailedPlaylists(accessToken)

  const savedTracksFunc = {
    data,
    setNextPage,
    savedTracksIsLoading,
    savedTracksMutate,
    isValidating,
  }

  useEffect(() => {
    if (data === undefined || playlists === undefined) {
      return
    }
    if (data?.length === 0 || playlists?.length === 0) {
      return
    }
    console.log('triggered')
    const updatedTracks = UpdateTracksWithPlaylistStatus(data, playlists)
    // savedTracksMutate(updatedTracks, false).catch((e) => {
    //   console.log(e)
    // })
  }, [data, playlists, savedTracksMutate])

  useEffect(() => {
    if (session?.user?.access_token === undefined) return
    const profile: AuthUser = session?.user
    setAccessToken(profile.access_token)
  }, [session])

  const context = {
    currPlaylist,
    setCurrPlaylist,
    playlists,
    currentTrack,
    setCurrentTrack,
    trackAudio,
    savedTracksFunc,
  }

  return (
    <OrchesContext.Provider value={context}>
      {session === undefined || status !== 'authenticated' ? (
        <Login />
      ) : (
        <div className="h-full w-full bg-spotify-background text-white">
          <Header />
          <div className="flex gap-8 w-full h-full pt-16 p-3 justify-center">
            {pathname !== '/orches/profile' && (
              <SideBar
                allRoutes={allRoutes}
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
                playlists={playlists}
                currPlaylist={currPlaylist}
                setCurrPlaylist={setCurrPlaylist}
              />
            )}
            <div className="flex rounded-lg shrink-0 w-4/6 h-full bg-container overflow-hidden">
              {allRoutes !== undefined && pathname !== '/orches/profile'
                ? (() => {
                    const route = allRoutes.find(
                      (route) => route.value === currentRoute,
                    )
                    return route !== null ? route?.node : null
                  })()
                : children}
            </div>
          </div>
        </div>
      )}
    </OrchesContext.Provider>
  )
}
