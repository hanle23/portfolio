import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk'

interface UserProfile {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: { spotify: string }
  followers: { href: string | null; total: number }
  href: string
  id: string
  images: Image[]
  product: string
  type: string
  uri: string
}

interface AuthUser {
  name: string
  email: string
  image: string
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
}

interface AccessTokenSuccessData {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

interface Playlists {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: PlaylistTrackObject[]
}

export interface DetailsPlaylistItem extends SimplifiedPlaylist {
  tracksDetails?: PlaylistTrackObject[]
}

interface PlaylistTrackObject {
  added_at: string
  added_by: UserProfile
  is_local: boolean
  track: TrackDetail
}

interface SavedTracks {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: SavedTracksObject[]
}

interface SavedTracksObject {
  added_at: string
  track: TrackDetail
}

interface TrackDetail {
  album: {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
    name: string
    release_date: string
    release_date_precision: string
    restrictions: {
      reason: string
    }
    type: string
    uri: string
    artists: Array<{
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
  }
  artists: Array<{
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: number
    }
    genres: string[]
    href: string
    id: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
    name: string
    popularity: number
    type: string
    uri: string
  }>
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_playable: boolean
  linked_from: TrackItem
  restrictions: {
    reason: string
  }
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  is_local: boolean
  isInPlaylist?: boolean
}
