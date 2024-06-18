import fetcher from './helper/fetchFunction'
import useSWR from 'swr'
const fetchPlaylists = (url: string, token: string): any =>
  fetcher({ url, token })

export const usePlaylists = (token: string): any => {
  const { data, error, isValidating, mutate } = useSWR(
    token !== null ? ['https://api.spotify.com/v1/me/playlists', token] : null,
    fetchPlaylists,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 429) {
          const retryAfter =
            error.info?.retry_after instanceof Number
              ? error.info?.retry_after
              : 60 // Default to 60 seconds if not provided
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

  const isLoading = isValidating && data !== undefined && data !== null

  return {
    playlists: data,
    isLoading,
    isError: error,
    isValidating,
    mutate,
  }
}
