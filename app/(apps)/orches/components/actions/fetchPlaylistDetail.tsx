export default async function FetchPlaylistDetails(
  accessToken: string | null,
  playlists: PlaylistItem[] | undefined,
): Promise<DetailsPlaylistItem[] | undefined> {
  try {
    if (playlists !== undefined && accessToken !== null) {
      const updatedPlaylists = await Promise.all(
        playlists?.map(async (playlist) => {
          const limit = 50
          let offset = 0
          let tracksDetails: PlaylistTrackObject[] = []

          while (true) {
            const response = await fetch(
              `/api/spotify/playlists/${playlist?.id}?offset=${offset}&limit=${limit}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            )

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            tracksDetails = [...tracksDetails, ...data.items]

            if (data?.next === undefined || data?.next === null) {
              break // Exit the loop if there are no more items to fetch
            }
            offset += limit // Increase the offset for the next page
          }

          // Append the fetched response to the original playlist item
          return { ...playlist, tracksDetails }
        }),
      )

      return updatedPlaylists
    } else {
      throw new Error('Missing access token or profile display name')
    }
  } catch (error) {
    console.error('Failed to fetch playlists:', error)
    // TODO: Add error handling
  }
}
