'use client'
import { useContext, useEffect } from 'react'
import { OrchesContext } from '../../../components/orchesAppWrapper'
import SavedTracksHeader from './components/savedTracksHeader'
export default function SavedTracksDetail(): JSX.Element {
  const context = useContext(OrchesContext)
  const { savedTracksFunc } = context ?? {}
  const savedTracks =
    savedTracksFunc?.data?.flatMap(
      (trackPage: SavedTracks) => trackPage.items,
    ) ?? []
  useEffect(() => {
    if (
      savedTracksFunc?.savedTracksIsLoading === false &&
      !savedTracksFunc?.isValidating
    )
      savedTracksFunc?.setNextPage().catch((e: any) => {
        console.log(e)
      })
  }, [
    savedTracksFunc,
    savedTracksFunc?.setNextPage,
    savedTracksFunc?.isValidating,
    savedTracksFunc?.savedTracksIsLoading,
  ])
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto overscroll-none">
      <SavedTracksHeader total={savedTracksFunc?.data?.[0]?.total} />
      {savedTracks?.map((track) => (
        <div key={track.track.id}>
          <div>{track.track.name}</div>
        </div>
      ))}
    </div>
  )
}
