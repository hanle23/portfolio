import useSWRInfinite from 'swr/infinite'
import type { Fetcher } from 'swr'
import type { SWRInfiniteResponse } from 'swr/infinite'
import { LIMIT } from '@/constants/spotify/savedTracks'
import type { SavedTracks } from '@/app/types/spotify/savedTracks'
import type { FetcherArgs } from './helper/fetchFunction'

interface ExtendedSWRInfiniteResponse<SavedTracks, Error>
  extends SWRInfiniteResponse<SavedTracks, Error> {
  setNextPage: () => Promise<void>
  isLoading: boolean
  size: number
  data: SavedTracks[] | undefined
}

export default function useFetchSavedTracks(
  fetcher: Fetcher<any, FetcherArgs>,
  accessToken: string | null,
): ExtendedSWRInfiniteResponse<SavedTracks, any> {
  const getKey = (
    pageIndex: number,
    previousPageData: any,
  ): FetcherArgs | null => {
    if (accessToken === null || fetcher === null) return null
    if (previousPageData !== null && previousPageData.next === null) return null
    if (pageIndex === 0) {
      return {
        url: `/api/spotify/savedTracks?offset=0&limit=${LIMIT}`,
        token: accessToken,
      }
    }
    return {
      url: `/api/spotify/savedTracks?offset=${
        previousPageData?.limit + previousPageData?.offset
      }&limit=${LIMIT}`,
      token: accessToken,
    }
  }
  const { data, size, setSize, mutate, isValidating, error } =
    useSWRInfinite<SavedTracks>(getKey, fetcher, {
      revalidateFirstPage: false,
    })
  const setNextPage = async (): Promise<void> => {
    if (data === undefined || data === null) return
    const limit = Math.ceil(data?.[0].total / LIMIT)
    if (size < limit) {
      await setSize(size + 1).catch((e) => {
        console.log(e)
      })
    }
  }
  const isLoading = isValidating && data !== undefined && data !== null
  return {
    data,
    size,
    setSize,
    mutate,
    isValidating,
    error,
    setNextPage,
    isLoading,
  }
}
