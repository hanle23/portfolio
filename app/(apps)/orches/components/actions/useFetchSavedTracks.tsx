import useSWRInfinite from 'swr/infinite'
import type { Fetcher } from 'swr'
import type { SWRInfiniteResponse } from 'swr/infinite'
import { LIMIT } from '@/constants/spotify/savedTracks'

export default function useFetchSavedTracks(
  fetcher: Fetcher<any>,
) {
  const getKey = (pageIndex: number, previousPageData: any): string | null => {
    if (previousPageData !== null && previousPageData.next === null) return null
    if (pageIndex === 0) return `/api/spotify/savedTracks/${playlist.id}?offset=0`
    return `/api/spotify/savedTracks/${playlist.id}?offset=${previousPageData?.limit + previousPageData?.offset
      }`
  }

  const { data, size, setSize, mutate, isValidating, error } =
    useSWRInfinite<Playlists>(getKey, fetcher, {
      revalidateFirstPage: false,
    })

  const setNextPage = async (): Promise<void> => {
    const limit = Math.ceil(playlist?.tracks?.total / LIMIT)
    if (size < limit) {
      await setSize(size + 1).catch((e) => {
        console.log(e)
      })
    }
  }
