'use client'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import fetcher from './helper/fetchFunction'
import type { DetailsPlaylistItem } from '@/app/types/types'

const fetchPlaylists = (token: string): any =>
  fetcher({ url: 'https://api.spotify.com/v1/me/playlists', token })
const fetchPlaylistTracks = (playlistId: string, token: string): any =>
  fetcher({
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    token,
  })

export default function useDetailedPlaylists(
  token: string | null,
  setPlaylist: any,
): any {
  const {
    data: playlists,
    error: playlistsError,
    isValidating: isLoadingPlaylists,
    mutate: mutatePlaylists,
  } = useSWR(
    token !== null ? ['https://api.spotify.com/v1/me/playlists', token] : null,
    (token: string) => fetchPlaylists(token),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 429) {
          const retryAfter =
            error.info?.retry_after !== undefined ? error.info?.retry_after : 60 // Default to 60 seconds if not provided
          setTimeout(() => {
            const result = revalidate({ retryCount })
            if (result instanceof Promise) {
              result.catch((e) => {
                console.log(e)
              })
            }
          }, retryAfter * 1000)
        }
      },
    },
  )

  const [detailedPlaylists, setDetailedPlaylists] = useState<
    DetailsPlaylistItem[]
  >([])
  console.log(playlists)

  useEffect(() => {
    if (playlists === undefined || token === null) return

    const fetchAllTracks = async (): Promise<void> => {
      const detailedPlaylistsPromises = playlists.items.map(
        async (playlist: DetailsPlaylistItem) => {
          const tracks = await fetchPlaylistTracks(playlist.id, token)
          return { ...playlist, tracks: tracks.items }
        },
      )

      const results = await Promise.all(detailedPlaylistsPromises)
      setDetailedPlaylists(results)
    }

    fetchAllTracks().catch((e) => {
      console.log(e)
    })
  }, [playlists, token, setPlaylist])

  return {
    data: detailedPlaylists,
    isLoading: isLoadingPlaylists,
    isError: playlistsError,
    mutate: mutatePlaylists,
  }
}
