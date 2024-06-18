import fetcher from './helper/fetchFunction'
import useSWR from 'swr'
const fetchPlaylistTracks = (playlistId: string, token: string): any =>
  fetcher({
    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    token,
  })

export const usePlaylistDetail = (playlistId: string, token: string): any => {
  const { data, error, isValidating, mutate } = useSWR(
    () =>
      playlistId !== null && token !== null
        ? [`playlistTracks/${playlistId}`, token]
        : null,
    () => fetchPlaylistTracks(playlistId, token),
  )

  const isLoading = isValidating && data !== undefined && data !== null

  return {
    tracks: data,
    isLoading,
    isError: error,
    mutateTracks: mutate,
  }
}
