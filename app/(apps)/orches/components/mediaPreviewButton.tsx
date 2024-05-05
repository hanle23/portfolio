'use client'
import { useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

export default function MediaPreviewButton({
  trackUrl,
  currentTrack,
  setCurrentTrack,
  trackAudio,
}: {
  trackUrl: string
  currentTrack: string | null
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined> | undefined
}): JSX.Element {
  const [, setIsPlaying] = useState(false)

  function handleOnClick(): void {
    if (trackAudio?.current === undefined) {
      return
    }
    if (currentTrack === trackUrl) {
      // If the current track is the same as the clicked track, stop the audio
      if (!trackAudio.current.paused) {
        trackAudio.current.currentTime = 0
        trackAudio.current.pause()
        setIsPlaying(false)
      } else {
        // If the audio is already stopped, play it
        trackAudio.current.play().catch((e) => {
          console.log(e)
        })
        setIsPlaying(true)
      }
    } else {
      // If the current track is different from the clicked track, stop the current track, set the new track, and play it
      trackAudio.current.currentTime = 0
      trackAudio.current.pause()
      trackAudio.current.src = trackUrl
      trackAudio.current.play().catch((e) => {
        console.log(e)
      })
      setCurrentTrack(trackUrl)
      setIsPlaying(true)
    }
  }

  return (
    <button onClick={handleOnClick}>
      {currentTrack === trackUrl &&
      trackAudio?.current !== undefined &&
      !trackAudio.current.paused ? (
        <StopIcon />
      ) : (
        <PlayArrowIcon />
      )}
    </button>
  )
}
