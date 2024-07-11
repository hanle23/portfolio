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
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import type { AuthUser } from '@/app/types/spotify/auth'

export interface OrchesContextType {
  currPlaylist: SimplifiedPlaylistObject | null
  setCurrPlaylist: React.Dispatch<
    React.SetStateAction<SimplifiedPlaylistObject | null>
  >
  playlists: SimplifiedPlaylistObject[] | undefined
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
  const [allItemsFetched, setAllItemsFetched] = useState<boolean>(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [currPlaylist, setCurrPlaylist] =
    useState<SimplifiedPlaylistObject | null>(null)
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
  } = useFetchSavedTracks(fetcher, accessToken, setAllItemsFetched)

  const { data: playlists } = useDetailedPlaylists(accessToken)

  const savedTracksFunc = {
    data,
    setNextPage,
    savedTracksIsLoading,
    savedTracksMutate,
    isValidating,
  }

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
      savedTracksMutate(updatedTracks).catch((e) => {
        console.log('error occurs')
      })
      setAllItemsFetched(true)
    }
  }, [data, playlists, savedTracksMutate, allItemsFetched])

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
