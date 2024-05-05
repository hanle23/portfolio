import type { OrchesContextType } from '@/app/(apps)/orches/components/appWrapper'

export default async function useDeletePlaylistItem(
  context: OrchesContextType | null,
  trackUri: string,
  playlistId: string,
  snapshotId: string,
): Promise<{ message: string; status: number }> {
  console.log('Delete function')
  console.log(trackUri)
  console.log(playlistId)
  console.log(snapshotId)
  try {
    const response = await fetch(`/api/spotify/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${context?.accessToken}`,
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
