import type { TrackObject } from './track'

interface SavedTracksObject {
  added_at: string
  track: TrackObject
}

export interface SavedTracks {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: SavedTracksObject[]
}
