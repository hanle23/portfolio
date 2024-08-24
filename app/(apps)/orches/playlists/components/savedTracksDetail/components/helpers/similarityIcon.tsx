'use client'
import Tooltip from '@mui/material/Tooltip'
export default function SimilarityIcon({
  featureSimilarity,
}: {
  featureSimilarity: number
}): JSX.Element {
  if (featureSimilarity < 40) {
    return <></>
  }
  const matchColor = ['#1DB954', '#FFA500', '#4169E1']
  const matchString = ['Match!', 'Similar', 'Slightly Similar']
  let matchIndex = -1
  if (featureSimilarity >= 40 && featureSimilarity < 60) {
    matchIndex = 2
  } else if (featureSimilarity >= 60 && featureSimilarity < 80) {
    matchIndex = 1
  } else if (featureSimilarity >= 80 && featureSimilarity <= 100) {
    matchIndex = 0
  }
  return (
    <Tooltip title={matchString[matchIndex]}>
      <div
        className="absolute top-0.5 left-1 h-4 w-4 rounded-full"
        style={{ backgroundColor: matchColor[matchIndex] }}
      />
    </Tooltip>
  )
}
