import type { ImageObject, SimplifiedUserProfile } from './general'
import type { TrackObject } from './track'
export interface PlaylistTrackObject {
  added_at: string
  added_by: SimplifiedUserProfile
  is_local: boolean
  track: TrackObject
}

export interface SimplifiedPlaylistObject {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: ImageObject[]
  name: string
  owner: SimplifiedUserProfile
  public: boolean
  snapshot_id: string
  tracks:
    | {
        href: string
        total: number
      }
    | PlaylistTrackObject[]
  type: string
  uri: string
}

export interface PlaylistResponse {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: SimplifiedPlaylistObject[]
}

export interface PlaylistItemResponse {
  href: string
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
  items: PlaylistTrackObject[]
}

export interface PlaylistSummary {
  id: string
  name: string
  images: ImageObject[]
  numOfTracks: number
  description: string
}
