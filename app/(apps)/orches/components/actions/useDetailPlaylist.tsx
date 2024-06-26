'use client'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import fetcher from './helper/fetchFunction'
import type { DetailsPlaylistItem } from '@/app/types/types'
import { useSession } from 'next-auth/react'
import { RETRY_AFTER_DEFAULT } from '@/constants/spotify/playlist'
import type { SWRResponse } from 'swr'

interface UseDetailedPlaylistsReturn {
  data: DetailsPlaylistItem[] | undefined
  isLoading: boolean
  isError: any // The type here depends on how errors are structured. It could be `Error | undefined` for simplicity.
  mutate: SWRResponse['mutate'] // Using the mutate type from SWRResponse for accuracy
}

const fetchPlaylists = (url: string, token: string): any =>
  fetcher({ url, token })
const fetchPlaylistTracks = (playlistId: string, token: string): any =>
  fetcher({
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    token,
  })

export default function useDetailedPlaylists(
  token: string | null,
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
    DetailsPlaylistItem[]
  >([])

  useEffect(() => {
    if (playlists === undefined || token === null) return

    const fetchAllTracks = async (): Promise<void> => {
      const filteredPlaylists = playlists?.items.filter(
        (playlist: DetailsPlaylistItem) =>
          playlist?.owner?.display_name === session?.user?.name,
      )
      const detailedPlaylistsPromises = filteredPlaylists.map(
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
  }, [playlists, token, session?.user])

  return {
    data: detailedPlaylists,
    isLoading: isLoadingPlaylists,
    isError: playlistsError,
    mutate: mutatePlaylists,
  }
}
