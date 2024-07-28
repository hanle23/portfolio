import React, { useState, useCallback, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

const MediaPreviewButton = React.memo(
  ({
    className,
    trackUrl,
    trackAudio,
  }: {
    className?: string
    trackUrl: string
    trackAudio: React.MutableRefObject<HTMLAudioElement | undefined> | undefined
  }): JSX.Element => {
    const [isPlaying, setIsPlaying] = useState(() => {
      const audioCurrent = trackAudio?.current
      if (audioCurrent == null) {
        return false
      } else {
        return !audioCurrent.paused
      }
    })

    // Effect to sync state with external changes (e.g., audio paused externally)
    useEffect(() => {
      if (trackAudio?.current === null || trackAudio?.current === undefined)
        return
      const audio = trackAudio.current

      const handlePlay = (): void => {
        setIsPlaying(true)
      }
      const handlePause = (): void => {
        setIsPlaying(false)
      }

      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)

      return () => {
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
      }
    }, [trackAudio])

    const handleOnClick = useCallback(() => {
      const audio = trackAudio?.current
      if (audio === null || audio === undefined) return

      let isCurrentTrack = trackUrl === audio.currentSrc
      if (!isCurrentTrack) {
        audio.src = trackUrl
        audio.currentTime = 0
        isCurrentTrack = true // Now it is the current track
      }

      if (audio.paused) {
        audio.play().catch(console.error)
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    }, [trackUrl, trackAudio])

    if (trackAudio?.current === undefined) {
      return <></>
    }

    return (
      <button
        onClick={handleOnClick}
        className={`${className ?? ''} hidden hover:text-spotify-color`}
      >
        {isPlaying ? <StopIcon /> : <PlayArrowIcon />}
      </button>
    )
  },
)
MediaPreviewButton.displayName = 'MediaPreviewButton'
export default MediaPreviewButton
