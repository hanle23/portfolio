'use server'
import fetcher from './helper/fetchFunction'
import type { PlaylistItemResponse } from '@/app/types/spotify/playlist'
import { LIMIT } from '@/constants/spotify/playlist'

export default async function fetchPlaylistItem(
  url: string,
  total: number,
  accessToken: string | undefined,
): Promise<PlaylistItemResponse[] | null> {
  if (accessToken === undefined || accessToken === null) {
    return null
  }
  let offset = 0
  const res: PlaylistItemResponse[] = []
  while (offset < total) {
    const fetchUrl = `${url}?offset=${offset}&limit=${LIMIT}`
    const fetch: PlaylistItemResponse = await fetcher({
      url: fetchUrl,
      token: accessToken,
    })
    res.push(fetch)
    offset = offset + LIMIT
  }
  return res
}
