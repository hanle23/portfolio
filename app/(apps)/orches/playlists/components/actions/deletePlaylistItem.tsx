export default async function deletePlaylistItem(
  trackUri: string,
  playlistId: string,
  snapshotId: string,
): Promise<{ message: string; status: number }> {
  try {
    const response = await fetch(
      `/api/spotify/playlists/${playlistId}/tracks`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tracks: [
            {
              uri: trackUri,
            },
          ],
          snapshot_id: snapshotId,
        }),
      },
    )
    const res = await response.json()
    return res
  } catch {
    return { message: 'Failed to delete playlist item', status: 404 }
  }
}
