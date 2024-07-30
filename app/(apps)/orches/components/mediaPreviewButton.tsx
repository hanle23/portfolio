'use client'
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

export default function MediaPreviewButton({
  className,
  currTrackUrl,
  trackUrl,
  setTrackUrl,
}: {
  className?: string
  currTrackUrl: string
  trackUrl: string
  setTrackUrl: (url: string) => void
}): JSX.Element {
  return (
    <button
      onClick={() => {
        trackUrl === currTrackUrl ? setTrackUrl('') : setTrackUrl(currTrackUrl)
      }}
      className={`${className ?? ''} hidden hover:text-spotify-color`}
    >
      {trackUrl === currTrackUrl ? <StopIcon /> : <PlayArrowIcon />}
    </button>
  )
}
