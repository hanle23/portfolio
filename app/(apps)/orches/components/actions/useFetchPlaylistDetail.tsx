import useSWR from 'swr'
import type { Fetcher } from 'swr'

export default function useFetchPlaylistDetails(
  fetcher: Fetcher<any>,
  playlist: PlaylistItem[] | undefined,
): Playlists {
  const playlistUrls = playlist?.map(
    (playlist: PlaylistItem) =>
      `/api/spotify/playlists/${playlist?.id}?offset=0`,
  )
  async function multiFetcher(urls) {
    return await Promise.all(urls.map((url) => fetcher(url)))
  }
  const { data, mutate, isValidating, error } = useSWR<Playlists>(
    playlistUrls,
    multiFetcher,
    {
      revalidateOnFocus: false,
    },
  )
  return data

  // const isLoading = isValidating && data !== undefined && data !== null

  // return {
  //   data,
  //   mutate,
  //   isValidating,
  //   error,
  //   isLoading,
  // }
}
