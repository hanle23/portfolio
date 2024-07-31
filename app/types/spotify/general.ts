export interface ArtistObject {
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
}

export interface SimplifiedArtistObject {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface ImageObject {
  url: string
  height: number | null
  width: number | null
}

export interface UserProfile {
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
  images: ImageObject[]
  product: string
  type: string
  uri: string
}

export interface SimplifiedUserProfile {
  external_urls: { spotify: string }
  followers: { href: string | null; total: number }
  href: string
  id: string
  type: string
  uri: string
  display_name: string | null
}
