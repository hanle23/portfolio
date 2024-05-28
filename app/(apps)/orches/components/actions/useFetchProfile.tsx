import type { Fetcher } from 'swr'
import useSWR from 'swr'
export default function useFetchProfile(
  fetcher: Fetcher<any>,
  accessToken: string | null,
): UserProfile | null | undefined {
  const { data: profile } = useSWR<UserProfile | null>(
    accessToken !== null ? `/api/spotify/profile` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  if (profile !== undefined) {
    return profile
  }
  return null
}
