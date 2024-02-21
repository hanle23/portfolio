const clientId = process.env.SPOTIFY_CLIENT_ID
const params = new URLSearchParams(window.location.search)
const code = params.get('code')

if (!code) {
  redirectToAuthCodeFlow(clientId)
} else {
  const accessToken = await getAccessToken(clientId, code)
  const profile = await fetchProfile(accessToken)
  populateUI(profile)
}

async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)
  localStorage.setItem('verifier', verifier)
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('response_type', 'code')
  params.append('redirect_uri', 'http://localhost:3000/callback')
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

async function getAccessToken(clientId: string, code: string) {
  // TODO: Get access token for code
}

async function fetchProfile(token: string): Promise<any> {
  // TODO: Call Web API
}

function populateUI(profile: any) {
  // TODO: Update UI with profile data
}
