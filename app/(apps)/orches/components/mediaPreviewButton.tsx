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
  setCurrentTrack: React.Dispatch<React.SetStateAction<string | null>>
  trackAudio: React.MutableRefObject<HTMLAudioElement | undefined> | undefined
}): JSX.Element {
  const [, setIsPlaying] = useState(false)

  function handleOnClick(): void {
    if (trackAudio?.current === undefined) {
      return
    }
    const audio = trackAudio.current
    const isCurrentTrack = currentTrack === trackUrl
    if (!isCurrentTrack) {
      setCurrentTrack(trackUrl)
      audio.src = trackUrl
      audio.currentTime = 0
    }

    if (audio.paused) {
      audio.play().catch(console.log)
    } else {
      audio.pause()
    }
    setIsPlaying(true)
    if (isCurrentTrack) audio.currentTime = 0
  }

  const IconComponent =
    currentTrack === trackUrl &&
    trackAudio?.current !== undefined &&
    !trackAudio.current.paused
      ? StopIcon
      : PlayArrowIcon

  return (
    <button
      onClick={handleOnClick}
      className={`${className ?? ''} hover:text-spotify-color`}
    >
      <IconComponent />
    </button>
  )
}
