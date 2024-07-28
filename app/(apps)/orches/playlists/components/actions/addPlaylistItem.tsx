export default async function addPlaylistItem(
  trackUri: string,
  playlistId: string,
): Promise<{ message: string; status: number }> {
  try {
    const response = await fetch(
      `/api/spotify/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      },
    )
    const res = await response.json()
    if (res.status !== 201) {
      return { message: 'Failed to add track to playlist', status: 500 }
    }
    return { message: 'Track added to playlist', status: 201 }
  } catch {
    return { message: 'Failed to delete playlist item', status: 404 }
  }
}
