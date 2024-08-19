'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import SideBar from './components/sideBar'
import { useSession } from 'next-auth/react'
import useFetchSavedTracks from './components/actions/useFetchSavedTracks'
import useFetchPlaylist from './components/actions/useFetchPlaylist'
import fetcher from './components/actions/helper/fetchFunction'
import fetchPlaylistItem from './components/actions/fetchPlaylistItem'
import type {
  PlaylistResponse,
  SimplifiedPlaylistObject,
  PlaylistSummary,
} from '@/app/types/spotify/playlist'
import type { TrackPlaylists } from '@/app/types/spotify/track'
import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import PlaylistDetail from './playlists/components/playlistDetail/playlistDetail'
import SavedTracksDetail from './playlists/components/savedTracksDetail/savedTracksDetail'
import { LIMIT as PLAYLIST_LIMIT } from '@/constants/spotify/playlist'
import { LIMIT as SAVEDTRACK_LIMIT } from '@/constants/spotify/savedTracks'
import { createDistinctTracks } from './components/actions/helper/createDistinctTracks'
import updateAudioFeatures from './components/actions/audioFeatures/updateAudioFeatures'
import updatePlaylistSummary from './components/actions/audioFeatures/updatePlaylistSummary'
import { Toaster } from 'react-hot-toast'

export default function Page(): React.JSX.Element {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>([])
  const [playlistsCompleted, setPlaylistsCompleted] = useState<boolean>(false)
  const [savedTracks, setSavedTracks] = useState<SavedTracks[]>([])
  const [savedTracksCompleted, setSavedTracksCompleted] =
    useState<boolean>(false)
  const [currPlaylist, setCurrPlaylist] =
    useState<SimplifiedPlaylistObject | null>(null)
  const [distinctPlaylist, setDistinctPlaylist] = useState<PlaylistSummary[]>(
    [],
  )
  const [distinctTracksInPlaylist, setDistinctTracksInPlaylist] =
    useState<TrackPlaylists>({})
  const audioFeaturesRef = useRef<Record<string, number | AudioFeaturesObject>>(
    {},
  )
  const [trackUrl, setTrackUrl] = useState<string>('')
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
    if (trackUrl === '') {
      trackAudio?.current?.pause()
      return
    }
    if (trackAudio?.current !== null && trackAudio?.current !== undefined) {
      trackAudio.current.src = trackUrl
      trackAudio.current.load()
      trackAudio.current.onloadeddata = () => {
        if (trackAudio?.current?.currentSrc === trackUrl) {
          trackAudio.current.play().catch((e) => {
            console.log(e)
          })
        }
      }

      trackAudio.current.onerror = (e) => {
        console.error('Error loading audio:', e)
      }
    }
  }, [trackUrl, trackAudio])

  useEffect(() => {
    if (
      savedTrackRes === null ||
      savedTrackRes === undefined ||
      savedTracksCompleted
    ) {
      return
    }
    const filteredTracks =
      savedTrackRes.filter(
        (savedTrack) =>
          !savedTracks.some(
            (prevTrack) =>
              prevTrack.href === savedTrack.href ||
              prevTrack.offset === savedTrack.offset,
          ),
      ) ?? []

    if (filteredTracks.length === 0) {
      return
    }
    setSavedTracks((prevSavedTracks) => {
      return [...prevSavedTracks, ...filteredTracks]
    })
    const savedTrackItems = filteredTracks.flatMap(
      (savedTrack) => savedTrack.items,
    )
    updateAudioFeatures(savedTrackItems, audioFeaturesRef.current)
      .then((value) => {
        if (value === undefined) {
          return
        }
        audioFeaturesRef.current = value
        const newDistinctPlaylist = updatePlaylistSummary(
          value,
          distinctTracksInPlaylist,
          distinctPlaylist,
        )
        if (newDistinctPlaylist !== null) {
          setDistinctPlaylist(newDistinctPlaylist)
        }
      })
      .catch((e) => {
        console.log(e)
      })

    if (
      savedTrackRes.length ===
      Math.ceil(savedTrackRes[0].total / SAVEDTRACK_LIMIT)
    ) {
      setSavedTracksCompleted(true)
    }
  }, [
    savedTrackRes,
    savedTracks,
    savedTracksCompleted,
    distinctPlaylist,
    distinctTracksInPlaylist,
  ])

  useEffect(() => {
    const processPlaylists = async (): Promise<void> => {
      if (
        playlistRes === null ||
        playlistsCompleted ||
        session?.user?.name === null ||
        session?.user?.access_token === null
      ) {
        return
      }

      let filteredPlaylistRes = playlistRes?.map((playlistResponse) => ({
        ...playlistResponse,
        items: playlistResponse?.items?.filter(
          (playlist) => playlist?.owner?.display_name === session?.user.name,
        ),
      }))

      if (filteredPlaylistRes === undefined) {
        return
      }

      try {
        filteredPlaylistRes = await Promise.all(
          filteredPlaylistRes.map(async (playlistResponse) => {
            const updatedItems = await Promise.all(
              playlistResponse.items.map(async (playlist) => {
                if (!Array.isArray(playlist.tracks) && session?.user !== null) {
                  const res = await fetchPlaylistItem(
                    playlist?.tracks?.href,
                    playlist?.tracks?.total,
                    session?.user?.access_token,
                  )
                  if (res === null) {
                    return playlist
                  }
                  const resItems = res.flatMap((res) => res.items)
                  const validTracks = resItems.filter(
                    (item) => item.track !== null,
                  )

                  const updatedAudioFeatures = await updateAudioFeatures(
                    validTracks,
                    audioFeaturesRef.current,
                  )
                  if (updatedAudioFeatures !== undefined) {
                    audioFeaturesRef.current = updatedAudioFeatures
                  }

                  const newPlaylist = { ...playlist, tracks: validTracks }
                  createDistinctTracks(
                    validTracks,
                    playlist.id,
                    distinctTracksInPlaylist,
                    setDistinctTracksInPlaylist,
                  )

                  return newPlaylist
                }
                return playlist
              }),
            )
            return { ...playlistResponse, items: updatedItems }
          }),
        )

        const filteredPlaylists =
          filteredPlaylistRes?.filter(
            (playlist) =>
              !playlists.some(
                (prevPlaylist) =>
                  prevPlaylist.href === playlist.href ||
                  prevPlaylist.offset === playlist.offset,
              ),
          ) ?? []

        if (filteredPlaylists.length === 0) {
          return
        }

        setPlaylists((prevPlaylists) => {
          return [...prevPlaylists, ...filteredPlaylists]
        })
        if (filteredPlaylistRes === undefined || filteredPlaylistRes === null) {
          return
        }

        setDistinctPlaylist((prevDistinctPlaylist) => {
          let newDistinctPlaylist = prevDistinctPlaylist
          filteredPlaylistRes?.forEach((playlistResponse) => {
            playlistResponse.items.forEach((playlist) => {
              const updatedPlaylistSummary = updatePlaylistSummary(
                audioFeaturesRef.current,
                distinctTracksInPlaylist,
                newDistinctPlaylist,
                playlist,
              )
              if (updatedPlaylistSummary !== null) {
                newDistinctPlaylist = updatedPlaylistSummary
              }
            })
          })
          return newDistinctPlaylist
        })

        if (
          playlistRes !== undefined &&
          playlistRes?.length ===
            Math.ceil(playlistRes?.[0].total / PLAYLIST_LIMIT)
        ) {
          setPlaylistsCompleted(true)
        }
      } catch (error) {
        console.error('Error processing playlists:', error)
      }
    }

    processPlaylists().catch((e) => {
      console.log(e)
    })
  }, [
    playlists,
    playlistRes,
    session?.user,
    playlistsCompleted,
    distinctTracksInPlaylist,
  ])

  useEffect(() => {
    if (!playlistsIsLoading && !playlistsIsValidating)
      playlistsSetNextPage().catch((e: any) => {
        console.log(e)
      })
  }, [playlistsSetNextPage, playlistsIsValidating, playlistsIsLoading])

  const handleSetCurrPlaylist = useCallback(
    (id: string | null): void => {
      if (id === null) {
        setCurrPlaylist(null)
      } else {
        setCurrPlaylist(
          playlists
            ?.flatMap((playlistRes) => playlistRes.items)
            .find((playlist) => playlist.id === id) ?? null,
        )
      }
      if (trackAudio?.current !== undefined && trackAudio?.current !== null) {
        trackAudio.current.currentTime = 0
        trackAudio.current.pause()
      }
    },
    [trackAudio, playlists],
  )

  return (
    <div className="flex gap-8 w-full h-full pt-16 p-3 justify-center">
      <SideBar
        playlists={distinctPlaylist}
        currPlaylist={currPlaylist}
        setCurrPlaylist={handleSetCurrPlaylist}
      />
      <div className="flex rounded-lg shrink-0 flex-1 h-full bg-container overflow-hidden">
        {currPlaylist !== undefined && currPlaylist !== null ? (
          <PlaylistDetail
            currPlaylist={currPlaylist}
            setCurrPlaylist={handleSetCurrPlaylist}
            playlistsMutate={playlistsMutate}
            trackUrl={trackUrl}
            setTrackUrl={setTrackUrl}
          />
        ) : (
          <SavedTracksDetail
            savedTracksFunc={{
              savedTracks,
              savedTracksSetNextPage,
              savedTracksIsLoading,
              savedTracksMutate,
              savedTracksIsValidating,
            }}
            playlists={distinctPlaylist}
            distinctTracksInPlaylist={distinctTracksInPlaylist}
            playlistsMutate={playlistsMutate}
            trackUrl={trackUrl}
            setTrackUrl={setTrackUrl}
            setDistinctTracksInPlaylist={setDistinctTracksInPlaylist}
          />
        )}
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
