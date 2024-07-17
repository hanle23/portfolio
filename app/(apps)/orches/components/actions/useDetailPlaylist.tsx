'use client'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import fetcher from './helper/fetchFunction'
import { useSession } from 'next-auth/react'
import { RETRY_AFTER_DEFAULT } from '@/constants/spotify/playlist'
import type { SimplifiedPlaylistObject } from '@/app/types/spotify/playlist'
import type { KeyedMutator } from 'swr'

interface UseDetailedPlaylistsReturn {
  data: SimplifiedPlaylistObject[] | undefined
  isLoading: boolean
  isError: Error | undefined
  mutate: KeyedMutator<any>
}

const fetchPlaylists = (url: string, token: string | undefined): any =>
  token !== undefined && fetcher({ url, token })
const fetchPlaylistTracks = (
  playlistId: string,
  token: string | undefined,
): any =>
  token !== undefined &&
  fetcher({
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    token,
  })

export default function useDetailedPlaylists(
  token: string | undefined,
): UseDetailedPlaylistsReturn {
  const { data: session } = useSession()
  const {
    data: playlists,
    error: playlistsError,
    isValidating: isLoadingPlaylists,
    mutate: mutatePlaylists,
  } = useSWR(
    ['https://api.spotify.com/v1/me/playlists', session?.user?.access_token],
    ([url, token]: string[]) => fetchPlaylists(url, token),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 429) {
          const retryAfter =
            error.info?.retry_after !== undefined
              ? error.info?.retry_after
              : RETRY_AFTER_DEFAULT
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
    SimplifiedPlaylistObject[]
  >([])

  useEffect(() => {
    if (playlists === undefined || token === null) return

    const fetchAllTracks = async (): Promise<void> => {
      const filteredPlaylists = playlists?.items.filter(
        (playlist: SimplifiedPlaylistObject) =>
          playlist?.owner?.display_name === session?.user?.name,
      )
      const detailedPlaylistsPromises = filteredPlaylists.map(
        async (playlist: SimplifiedPlaylistObject) => {
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
  }, [playlists, token, session?.user])

  return {
    data: detailedPlaylists,
    isLoading: isLoadingPlaylists,
    isError: playlistsError,
    mutate: mutatePlaylists,
  }
}
