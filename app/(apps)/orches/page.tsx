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
import type {
  TrackPlaylists,
  AudioFeaturesObject,
} from '@/app/types/spotify/track'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import PlaylistDetail from './playlists/components/playlistDetail/playlistDetail'
import SavedTracksDetail from './playlists/components/savedTracksDetail/savedTracksDetail'
import { LIMIT as PLAYLIST_LIMIT } from '@/constants/spotify/playlist'
import { LIMIT as SAVEDTRACK_LIMIT } from '@/constants/spotify/savedTracks'
import { createDistinctTracks } from './components/actions/helper/createDistinctTracks'
import { Toaster } from 'react-hot-toast'
import setFeaturesHolder from './components/actions/audioFeatures/setFeaturesHolder'
import queueAudioFeatures from './components/actions/audioFeatures/queueAudioFeatures'

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
    if (savedTrackRes === null || savedTrackRes === undefined) {
      return
    }
    if (savedTracksCompleted) {
      return
    }
    const filteredTracks = savedTrackRes.filter(
      (savedTrack) =>
        !savedTracks.some(
          (prevTrack) =>
            prevTrack.href === savedTrack.href ||
            prevTrack.offset === savedTrack.offset,
        ),
    )
    setSavedTracks((prevTracks) => {
      if (prevTracks?.length === 0) {
        return savedTrackRes
      }
      return [...prevTracks, ...filteredTracks]
    })
    filteredTracks.forEach((savedTracks) => {
      setFeaturesHolder(savedTracks.items, audioFeatures, setAudioFeatures)
    })
    setSavedTracksCompleted(
      savedTrackRes.length ===
        Math.ceil(savedTrackRes[0].total / SAVEDTRACK_LIMIT),
    )
  }, [
    savedTracks,
    savedTrackRes,
    session?.user?.name,
    savedTracksCompleted,
    audioFeatures,
  ])

  useEffect(() => {
    if (
      Object.keys(audioFeatures).length % 100 !== 0 ||
      (!savedTracksCompleted && !playlistsCompleted)
    )
      return
    queueAudioFeatures(audioFeatures, setAudioFeatures).catch((e) => {
      console.log(e)
    })
  }, [audioFeatures, savedTracksCompleted, playlistsCompleted])

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
                setFeaturesHolder(res.items, audioFeatures, setAudioFeatures)
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
    setPlaylistsCompleted(
      playlistRes.length === Math.ceil(playlistRes[0].total / PLAYLIST_LIMIT),
    )
  }, [
    playlistRes,
    session?.user,
    distinctTracksInPlaylist,
    playlistsCompleted,
    audioFeatures,
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
