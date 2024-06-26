import type { SavedTracks, DetailsPlaylistItem } from '@/app/types/types'
export default function UpdateTracksWithPlaylistStatus(
  playlists: SavedTracks[],
  savedTracks: DetailsPlaylistItem[],
): SavedTracks[] {
  console.log('savedTracks', savedTracks)
  console.log('playlists', playlists)
}
