'use client'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
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
import { Toaster } from 'react-hot-toast'
import setFeaturesHolder from './components/actions/audioFeatures/setFeaturesHolder'
import queueAudioFeatures from './components/actions/audioFeatures/queueAudioFeatures'
import IsObjectNeedToFetch from './components/actions/helper/isObjectNeedToFetch'
import { throttle } from 'lodash'

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
  const [audioFeatures, setAudioFeatures] = useState<
    Record<string, number | AudioFeaturesObject>
  >({})
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

  const debouncedSetAudioFeatures = useMemo(
    () =>
      throttle(() => {
        if (
          audioFeaturesRef.current !== null &&
          audioFeaturesRef.current !== undefined
        ) {
          while (IsObjectNeedToFetch(audioFeaturesRef.current)) {
            queueAudioFeatures(audioFeaturesRef.current)
              .then((value) => {
                if (value !== null) {
                  audioFeaturesRef.current = value
                  setAudioFeatures(audioFeaturesRef.current)
                }
              })
              .catch((e) => {
                console.log(e)
              })
          }
        }
      }, 1000),
    [],
  )

  const updateAudioFeatures = useCallback(
    (newFeatures: Record<string, number | AudioFeaturesObject>) => {
      audioFeaturesRef.current = newFeatures
      debouncedSetAudioFeatures()
    },
    [debouncedSetAudioFeatures],
  )
  // const updatePlaylistSummary = (
  //   audioFeatures: Record<string, number | AudioFeaturesObject>,
  //   distinctTracksInPlaylist: TrackPlaylists,
  //   distinctPlaylist: PlaylistSummary[],
  //   setDistinctPlaylist: React.Dispatch<
  //     React.SetStateAction<PlaylistSummary[]>
  //   >,
  // ): void => {
  //   const newDistinctPlaylist = distinctPlaylist
  //   for (let i = 0; i < distinctPlaylist.length; i++) {
  //     if (
  //       newDistinctPlaylist[i].tracksFeatures !== undefined &&
  //       newDistinctPlaylist[i]?.tracksFeatures?.length ===
  //         newDistinctPlaylist[i].numOfTracks
  //     ) {
  //       continue
  //     }
  //     const playlistId = newDistinctPlaylist[i].id
  //     const newTracksFeatures: AudioFeaturesObject[] =
  //       newDistinctPlaylist[i].tracksFeatures ?? []
  //     Object.keys(distinctTracksInPlaylist).forEach((trackId: string) => {
  //       if (distinctTracksInPlaylist[trackId].includes(playlistId)) {
  //         const audioFeature = audioFeatures[trackId]
  //         if (audioFeature !== undefined && audioFeature instanceof Object) {
  //           newTracksFeatures.push(audioFeature)
  //         }
  //       }
  //     })
  //     newDistinctPlaylist[i].tracksFeatures = newTracksFeatures
  //   }
  //   setDistinctPlaylist(newDistinctPlaylist)
  // }

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

    setSavedTracks((prevTracks) => {
      const filteredTracks = savedTrackRes.filter(
        (savedTrack) =>
          !prevTracks.some(
            (prevTrack) =>
              prevTrack.href === savedTrack.href ||
              prevTrack.offset === savedTrack.offset,
          ),
      )
      const newTracks =
        prevTracks?.length === 0
          ? savedTrackRes
          : [...prevTracks, ...filteredTracks]
      const savedTrackItems = newTracks.flatMap(
        (savedTrack) => savedTrack.items,
      )
      setFeaturesHolder(
        savedTrackItems,
        audioFeaturesRef.current,
        updateAudioFeatures,
      )
      return newTracks
    })
    if (
      savedTrackRes.length ===
      Math.ceil(savedTrackRes[0].total / SAVEDTRACK_LIMIT)
    ) {
      setSavedTracksCompleted(true)
    }
  }, [savedTrackRes, savedTracksCompleted, updateAudioFeatures])

  useEffect(() => {
    if (playlistRes === null || playlistRes === undefined) {
      return
    }
    if (playlistsCompleted) return

    if (session?.user?.name === undefined) {
      return
    }
    const filteredPlaylistRes = playlistRes?.map((playlistResponse) => ({
      ...playlistResponse,
      items: playlistResponse?.items?.filter(
        (playlist) => playlist?.owner?.display_name === session?.user?.name,
      ),
    }))

    filteredPlaylistRes.forEach((playlistResponse) => {
      playlistResponse.items.forEach((playlist) => {
        !Array.isArray(playlist.tracks) &&
          fetchPlaylistItem(playlist?.tracks?.href, session?.user?.access_token)
            .then((res) => {
              if (res.items !== undefined) {
                playlist.tracks = res.items
                createDistinctTracks(
                  res.items,
                  playlist.id,
                  distinctTracksInPlaylist,
                  setDistinctTracksInPlaylist,
                )
                setFeaturesHolder(
                  res.items,
                  audioFeaturesRef.current,
                  updateAudioFeatures,
                )
              }
            })
            .catch((e) => {
              console.log(e)
            })
      })
    })

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
          numOfTracks: Array.isArray(playlist.tracks)
            ? playlist.tracks.length
            : playlist.tracks.total,
          description: playlist.description,
          snapshot_id: playlist.snapshot_id,
        })),
      )
    })
    if (
      playlistRes.length === Math.ceil(playlistRes[0].total / PLAYLIST_LIMIT)
    ) {
      setPlaylistsCompleted(true)
    }
  }, [
    playlistRes,
    distinctTracksInPlaylist,
    session?.user,
    playlistsCompleted,
    audioFeatures,
    updateAudioFeatures,
  ])

  // useEffect(() => {
  //   if (Object.keys(audioFeatures).length < 100) {
  //     return
  //   }
  //   queueAudioFeatures(audioFeatures)
  //     .then((value) => {
  //       if (value !== null) {
  //         setAudioFeatures(value)
  //         updatePlaylistSummary(
  //           value,
  //           distinctTracksInPlaylist,
  //           distinctPlaylist,
  //           setDistinctPlaylist,
  //         )
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, [
  //   savedTracksCompleted,
  //   playlistsCompleted,
  //   audioFeatures,
  //   distinctPlaylist,
  //   distinctTracksInPlaylist,
  // ])

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
