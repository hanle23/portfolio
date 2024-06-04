'use client'
import { useContext, useEffect, useRef } from 'react'
import { OrchesContext } from '../../../components/appWrapper'
import SavedTracksHeader from './components/savedTracksHeader'
export default function SavedTracksDetail(): JSX.Element {
  const context = useContext(OrchesContext)
  const scrollableElementRef = useRef(null)
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
    <div
      ref={scrollableElementRef}
      className="flex flex-col h-full w-full overflow-y-auto"
    >
      <SavedTracksHeader
        scrollableElementRef={scrollableElementRef}
        total={savedTracksFunc?.data?.[0]?.total}
      />
      {savedTracks.map((track) => (
        <div key={track.track.id}>
          <div>{track.track.name}</div>
        </div>
      ))}
    </div>
  )
}
