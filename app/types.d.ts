interface UserProfile {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: { spotify: string }
  followers: { href: string; total: number }
  href: string
  id: string
  images: Image[]
  product: string
  type: string
  uri: string
}

interface AccessTokenSuccessData {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

interface UserPlaylists {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: PlaylistItem[]
}

interface PlaylistItem {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }
  name: string
  owner: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: number
    }
    href: string
    id: string
    type: string
    uri: string
    display_name: string
  }
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: string
  uri: string
}
