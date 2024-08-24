export default function IsExistInPlaylist(
  playlistId: string,
  distinctTracksInPlaylist: Record<string, string[]>,
  currTrackId: string,
  playlistsToAdd: string[],
  playlistsToRemove: string[],
): boolean {
  if (
    !distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
    !playlistsToAdd.includes(playlistId)
  ) {
    return false
  } else if (
    distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
    !playlistsToRemove.includes(playlistId)
  ) {
    return true
  } else if (
    distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
    playlistsToRemove.includes(playlistId)
  ) {
    return false
  } else if (
    !distinctTracksInPlaylist[currTrackId]?.includes(playlistId) &&
    playlistsToAdd.includes(playlistId)
  ) {
    return true
  }
  return false
}
