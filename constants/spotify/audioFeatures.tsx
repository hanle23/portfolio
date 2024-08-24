import type { AudioFeaturesObject } from '@/app/types/spotify/audioFeatures'
export const FEATURE_NAMES: Array<keyof AudioFeaturesObject> = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'key',
  'liveness',
  'loudness',
  'mode',
  'speechiness',
  'tempo',
  'time_signature',
  'valence',
]

interface FEATURE_PROPERTIES {
  min: number
  max: number
  factorOfMargin: number | null
}

export const FEATURE_SETTINGS: Record<
  keyof AudioFeaturesObject,
  FEATURE_PROPERTIES | null
> = {
  acousticness: { min: 0, max: 1, factorOfMargin: 500 },
  danceability: { min: 0, max: 1, factorOfMargin: 500 },
  energy: { min: 0, max: 1, factorOfMargin: 500 },
  instrumentalness: { min: 0, max: 1, factorOfMargin: 500 },
  key: { min: 0, max: 11, factorOfMargin: null },
  liveness: { min: 0, max: 1, factorOfMargin: 500 },
  loudness: { min: -60, max: 0, factorOfMargin: 500 },
  mode: { min: 0, max: 1, factorOfMargin: null },
  speechiness: { min: 0, max: 1, factorOfMargin: 500 },
  tempo: { min: 0, max: 250, factorOfMargin: 500 },
  time_signature: { min: 3, max: 7, factorOfMargin: null },
  valence: { min: 0, max: 1, factorOfMargin: 500 },
  analysis_url: null,
  duration_ms: null,
  id: null,
  track_href: null,
  type: null,
  uri: null,
}

export const percentPerErrMargin = 2
