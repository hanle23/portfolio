import sdk from '@/lib/spotify-sdk/ClientInstance'
export default async function FetchPlaylists(
  playlist: DetailsPlaylistItem[],
  setPlaylist: React.Dispatch<React.SetStateAction<DetailsPlaylistItem[]>>,
  // accessToken: string | null,
  profile: UserProfile | null | undefined,
): Promise<PlaylistItem[] | undefined> {
  // try {
  //   if (accessToken !== null && profile?.display_name !== undefined) {
  //     const response = await fetch(
  //       `/api/spotify/playlists?username=${profile?.display_name}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     }

  //     const data = await response.json()
  //     return data
  //   }
  // } catch (error) {
  //   console.error('Failed to fetch playlists:', error)
  //   // TODO: Add error handling
  // }
  return undefined
}
