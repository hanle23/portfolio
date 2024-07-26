import fetcher from './helper/fetchFunction'
import type { PlaylistItemResponse } from '@/app/types/spotify/playlist'
export default async function fetchPlaylistItem(
  url: string,
  accessToken: string,
): Promise<PlaylistItemResponse> {
  return fetcher({
    url,
    token: accessToken,
  })
}
