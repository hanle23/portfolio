import type { ImageObject } from './general'
export interface AuthUser {
  name: string
  email: string
  image: ImageObject[]
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
  external_urls: { spotify: string }
  followers: { href: string | null; total: number }
}

export interface AccessTokenSuccessData {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}
