import sdk from '@/lib/spotify-sdk/ClientInstance'
import type { AuthUser, DetailsPlaylistItem } from '@/app/types/types'
import { LIMIT } from 'constants/spotify/playlist'
import CanContinue from './helper/canContinue'
import UniqueById from './helper/uniqueById'
export default async function FetchPlaylists(
  setPlaylists: React.Dispatch<
    React.SetStateAction<DetailsPlaylistItem[] | []>
  >,
  profile: AuthUser,
  setFetchIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  setFetchIsRunning(true)
  let total = null
  let offset = 0
  let next = null

  while (CanContinue(total, offset, next)) {
    const response = await sdk.currentUser.playlists.playlists(LIMIT, offset)
    console.log(response)
    if (response.total === undefined) {
      break
    }
    const playlistsToPush = response.items.filter(
      (playlist) => playlist.owner.display_name === profile?.name,
    )
    setPlaylists((prev: DetailsPlaylistItem[] | []) => {
      return UniqueById([...(prev ?? []), ...playlistsToPush])
    })
    total = response.total
    next = response.next
    offset += LIMIT
  }
  setFetchIsRunning(false)
}
