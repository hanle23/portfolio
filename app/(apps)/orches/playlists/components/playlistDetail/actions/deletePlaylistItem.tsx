import { useSession } from 'next-auth/react'
export default async function useDeletePlaylistItem(
  trackUri: string,
  playlistId: string,
  snapshotId: string,
): Promise<{ message: string; status: number }> {
  const { data: session } = useSession()
  if (session === undefined)
    return { message: 'User not authorized to use this action', status: 401 }
  try {
    const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        tracks: [
          {
            uri: trackUri,
          },
        ],
        snapshot_id: snapshotId,
      }),
    })
    const res = await response.json()
    return res
  } catch {
    return { message: 'Failed to delete playlist item', status: 404 }
  }
}
