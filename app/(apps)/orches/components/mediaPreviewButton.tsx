'use client'
import { useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

export default function MediaPreviewButton({
  className,
  trackUrl,
  currentTrack,
  setCurrentTrack,
  trackAudio,
}: {
  className?: string
  trackUrl: string
  currentTrack: string | null | undefined
  setCurrentTrack:
    | React.Dispatch<React.SetStateAction<string | null>>
    | undefined
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined> | undefined
}): JSX.Element {
  const [, setIsPlaying] = useState(false)

  function handleOnClick(): void {
    if (trackAudio?.current === undefined) {
      return
    }
    if (currentTrack === trackUrl || setCurrentTrack === undefined) {
      if (!trackAudio.current.paused) {
        trackAudio.current.currentTime = 0
        trackAudio.current.pause()
        setIsPlaying(false)
      } else {
        trackAudio.current.play().catch((e) => {
          console.log(e)
        })
        setIsPlaying(true)
      }
    } else {
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
    <button
      onClick={handleOnClick}
      className={`${className ?? ''} hover:text-spotify-color`}
    >
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
