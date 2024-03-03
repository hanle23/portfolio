import { setLocalStorageItem } from '@/utils/LocalStorage'
import getClientID from './getClientID'

export async function redirectToAuthCodeFlow(): Promise<void> {
  const clientID = getClientID()
  if (clientID === undefined) {
    throw new Error('Client ID not found')
  }
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)
  setLocalStorageItem('verifier', verifier)
  const params = new URLSearchParams()
  params.append('client_id', clientID)
  params.append('response_type', 'code')
  params.append('redirect_uri', `http://localhost:3000/beatsflow`)
  params.append('scope', 'user-read-private user-read-email')
  params.append('code_challenge_method', 'S256')
  params.append('code_challenge', challenge)
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
}

function generateCodeVerifier(length: number): string {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const specialCharacters = '_.-~'

  const allPossibleCharacters = letters + digits + specialCharacters
  const values = window.crypto.getRandomValues(new Uint8Array(length))
  return values.reduce(
    (acc, x) => acc + allPossibleCharacters[x % allPossibleCharacters.length],
    '',
  )
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))),
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
