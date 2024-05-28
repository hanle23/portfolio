import type { Fetcher } from 'swr'
import useSWR from 'swr'
export default function useFetchPlaylists(
  fetcher: Fetcher<any>,
  accessToken: string | null,
  profile: UserProfile | null | undefined,
): PlaylistItem[] | undefined {
  const { data: playlists } = useSWR<PlaylistItem[] | undefined>(
    fetcher !== null &&
      accessToken !== null &&
      profile?.display_name !== undefined
      ? `/api/spotify/playlists?username=${profile?.display_name}`
      : null,
    fetcher,
  )
  return playlists
}
