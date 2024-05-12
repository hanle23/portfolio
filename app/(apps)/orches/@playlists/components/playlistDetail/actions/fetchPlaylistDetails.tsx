import useSWRInfinite from 'swr/infinite'
import type { OrchesContextType } from '@/app/(apps)/orches/components/appWrapper'
import type { SWRInfiniteResponse } from 'swr/infinite'
import { LIMIT } from '@/constants/spotify/playlist'


interface ExtendedSWRInfiniteResponse<Playlists, Error>
  extends SWRInfiniteResponse<Playlists, Error> {
  setNextPage: () => Promise<void>
  isLoading: boolean
  size: number
  data: Playlists[] | undefined

}

export default function useFetchPlaylistDetails(
  context: OrchesContextType | null,
  playlist: PlaylistItem,
): ExtendedSWRInfiniteResponse<Playlists, any> {
  const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  const getKey = (pageIndex: number, previousPageData: any): string | null => {
    if (previousPageData !== null && previousPageData.next === null) return null
    if (pageIndex === 0) return `/api/spotify/playlists/${playlist.id}?offset=0`
    return `/api/spotify/playlists/${playlist.id}?offset=${
      previousPageData?.limit + previousPageData?.offset
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
  const isLoading = error !== false && data !== undefined
  return {
    data,
    size,
    setSize,
    mutate,
    isValidating,
    error,
    isLoading,
    setNextPage,
  }
}
