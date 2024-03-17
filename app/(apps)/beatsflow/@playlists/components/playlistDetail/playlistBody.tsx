'use client'
import useSWRInfinite from 'swr/infinite'
import { useContext } from 'react'
import { BeatsflowContext } from '../../../components/appWrapper'
import { Pagination } from '@nextui-org/react'

export default function PlaylistBody({
  playlist,
}: {
  playlist: PlaylistItem
}): React.JSX.Element {
  const context = useContext(BeatsflowContext)
  const fetcher = context?.fetcher !== undefined ? context.fetcher : null
  const getKey = (pageIndex: number, previousPageData: any): string | null => {
    if (previousPageData !== null && previousPageData.next === null) return null
    if (pageIndex === 0) return `/api/spotify/playlists/${playlist.id}?offset=0`
    // Otherwise, return the next URL
    return `/api/spotify/playlists/${playlist.id}?offset=${
      previousPageData?.limit + previousPageData?.offset
    }`
  }
  const { data, setSize } = useSWRInfinite(getKey, fetcher)
  return (
    <div>
      <Pagination
        showControls
        total={Math.ceil(playlist.tracks.total / 50)}
        initialPage={1}
        disableAnimation={true}
        classNames={{ item: 'data-[active]:bg-spotify-color rounded-full' }}
        className="bg-transparent"
        onChange={(page) => {
          setSize(page).catch((e) => {
            console.log(e)
          })
        }}
      />
    </div>
  )
}
