'use client'
import { useContext, useEffect } from 'react'
import { OrchesContext } from '../../../components/orchesAppWrapper'
import SavedTracksHeader from './components/savedTracksHeader'
import SavedTracksItem from './components/savedTracksItem'
import type {
  SavedTracks,
  SavedTracksObject,
} from '@/app/types/spotify/savedTracks'
export default function SavedTracksDetail(): JSX.Element {
  const context = useContext(OrchesContext)
  const trackAudio = context?.trackAudio
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
      <div className="flex flex-col h-full w-full space-y-3 pt-3">
        {savedTracks?.map((track: SavedTracksObject, index: number) => (
          <SavedTracksItem
            key={track.track.id}
            index={index}
            track={track}
            currentTrack={context?.currentTrack}
            setCurrentTrack={context?.setCurrentTrack}
            trackAudio={trackAudio}
          />
        ))}
      </div>
    </div>
  )
}
