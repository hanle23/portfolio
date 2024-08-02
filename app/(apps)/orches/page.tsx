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
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import PlaylistPage from './playlists/playlistsPage'
import { LIMIT as PLAYLIST_LIMIT } from '@/constants/spotify/playlist'
import { LIMIT as SAVEDTRACK_LIMIT } from '@/constants/spotify/savedTracks'
import { updateDistinctTracks } from './components/actions/helper/updateDistinctTracks'

export default function Page(): React.JSX.Element {
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<PlaylistResponse[]>([])
  const [savedTracks, setSavedTracks] = useState<SavedTracks[]>([])
  const [currPlaylist, setCurrPlaylist] =
    useState<SimplifiedPlaylistObject | null>(null)
  const [distinctPlaylist, setDistinctPlaylist] = useState<PlaylistSummary[]>(
    [],
  )
  const [distinctTracksInPlaylist, setDistinctTracksInPlaylist] =
    useState<TrackPlaylists>({})
  const [trackUrl, setTrackUrl] = useState<string>('')
  const trackAudio = useRef(typeof Audio !== 'undefined' ? new Audio() : null)
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
    if (trackAudio?.current !== null) {
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
  }, [savedTrackRes, session?.user?.name])

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
      if (session?.user?.name !== undefined) {
        filteredPlaylistRes.forEach((playlistResponse) => {
          playlistResponse.items.forEach((playlist) => {
            !Array.isArray(playlist.tracks) &&
              fetchPlaylistItem(
                playlist?.tracks?.href,
                session?.user?.access_token,
              )
                .then((res) => {
                  if (res.items !== undefined) {
                    playlist.tracks = res.items
                  }
                })
                .catch((e) => {
                  console.log(e)
                })
          })
        })
      }
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
    }
  }, [playlistRes, session?.user])

  useEffect(() => {
    const newDistinctTracksInPlaylist = updateDistinctTracks(
      playlists,
      distinctTracksInPlaylist,
    )
    console.log(playlists)
    console.log(newDistinctTracksInPlaylist)
    if (
      newDistinctTracksInPlaylist !== null &&
      newDistinctTracksInPlaylist !== distinctTracksInPlaylist
    ) {
      console.log(newDistinctTracksInPlaylist)
      setDistinctTracksInPlaylist(newDistinctTracksInPlaylist)
    }
  }, [playlists, distinctTracksInPlaylist, session?.user])

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
        <PlaylistPage
          currPlaylist={currPlaylist}
          handleSetCurrPlaylist={handleSetCurrPlaylist}
          savedTracksFunc={savedTracksFunc}
          playlists={distinctPlaylist}
          playlistsMutate={playlistsMutate}
          distinctTracksInPlaylist={distinctTracksInPlaylist}
          trackUrl={trackUrl}
          setTrackUrl={setTrackUrl}
        />
      </div>
    </div>
  )
}
