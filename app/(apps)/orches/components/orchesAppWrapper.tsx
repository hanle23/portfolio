'use client'
import React, { createContext, useState, useRef, useEffect } from 'react'
import type { Fetcher } from 'swr'
import SideBar from './sideBar'
import { Header } from './header'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Login from './auth/login'
import useFetchSavedTracks from './actions/useFetchSavedTracks'
import useDetailedPlaylists from './actions/useDetailPlaylist'
import fetcher from './actions/helper/fetchFunction'

import type {
  SavedTracks,
  AuthUser,
  DetailsPlaylistItem,
} from '@/app/types/types'

export interface OrchesContextType {
  isLoading: boolean
  fetcher: Fetcher<any> | undefined
  currPlaylist: DetailsPlaylistItem | null
  setCurrPlaylist: React.Dispatch<
    React.SetStateAction<DetailsPlaylistItem | null>
  >
  playlists: DetailsPlaylistItem[] | null
  currentTrack: string | null
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined>
  savedTracksFunc: {
    data: SavedTracks[] | undefined
    setNextPage: () => Promise<void>
    savedTracksIsLoading: boolean
    mutate: () => void
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
  const { data: playlists } = useDetailedPlaylists(accessToken, setCurrPlaylist)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const trackAudio = useRef(
    typeof Audio !== 'undefined' ? new Audio() : undefined,
  )
  const pathname = usePathname()
  // const fetcher: Fetcher<any | null> = (url: string): any | null => {
  //   if (accessToken === null || accessToken === undefined) {
  //     return null
  //   }

  //   return fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(async (res) => await res.json())
  // }

  const {
    data,
    setNextPage,
    isLoading: savedTracksIsLoading,
    mutate,
    isValidating,
  } = useFetchSavedTracks(fetcher, accessToken)

  const savedTracksFunc = {
    data,
    setNextPage,
    savedTracksIsLoading,
    mutate,
    isValidating,
  }
  // const { data: playlists } = useSWR('/api/spotify/playlists', fetcher)
  // useEffect(() => {
  //   if (
  //     accessToken !== null &&
  //     session?.user !== undefined &&
  //     !fetchIsRunning
  //   ) {
  //     const profile: AuthUser = session?.user
  //     FetchPlaylists(setPlaylists, profile, setFetchIsRunning).catch((e) => {
  //       console.log(e)
  //     })
  //   }
  // }, [accessToken, playlists, session, fetchIsRunning, setPlaylists])
  // const fetchData = useCallback(
  //   async (
  //     mode: 'All' | 'Playlist',
  //     playlist?: PlaylistItem,
  //   ): Promise<void> => {
  //     const playlists = await FetchPlaylists(accessToken, profile)
  //     if (playlists !== undefined) {
  //       const details = await FetchPlaylistDetails(accessToken, playlists)
  //       if (details !== undefined) {
  //         setPlaylists(details)
  //       }
  //     }
  //   },
  //   [accessToken, profile, setPlaylists],
  // )

  // useEffect(() => {
  //   fetchData('All').catch((e) => {
  //     console.error(e)
  //   })
  // }, [fetchData, accessToken, profile])

  useEffect(() => {
    if (session?.user?.access_token === undefined) return
    const profile: AuthUser = session?.user
    setAccessToken(profile.access_token)
  }, [session])

  const context = {
    // isLoading,
    // fetcher,
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
