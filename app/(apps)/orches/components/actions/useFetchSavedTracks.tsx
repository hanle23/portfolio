import useSWRInfinite from 'swr/infinite'
import type { Fetcher } from 'swr'
import type { SWRInfiniteResponse } from 'swr/infinite'
import { LIMIT, RETRY_AFTER_DEFAULT } from '@/constants/spotify/savedTracks'
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
  accessToken: string | undefined,
): ExtendedSWRInfiniteResponse<SavedTracks, any> {
  const getKey = (
    pageIndex: number,
    previousPageData: any,
  ): FetcherArgs | null => {
    if (accessToken === undefined || fetcher === null) return null
    if (previousPageData !== null && previousPageData?.next === null) {
      return null
    }
    if (pageIndex === 0) {
      return {
        url: `/api/spotify/savedTracks?offset=0&limit=${LIMIT}`,
        token: accessToken,
      }
    }
    const offset = LIMIT + previousPageData?.offset
    return {
      url: `/api/spotify/savedTracks?offset=${offset}&limit=${LIMIT}`,
      token: accessToken,
    }
  }
  const { data, size, setSize, mutate, isValidating, error } =
    useSWRInfinite<SavedTracks>(getKey, fetcher, {
      revalidateFirstPage: false,
      revalidateAll: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
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
    })
  const setNextPage = async (): Promise<void> => {
    if (data === undefined || data === null) return
    if (data?.[data.length - 1]?.next === null) return
    await setSize(size + 1).catch((e) => {
      console.log(e)
    })
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
