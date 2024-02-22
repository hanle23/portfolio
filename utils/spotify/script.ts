function getClientID(): string {
  const clientID = '08795885b8704b8ab1bfc7010d8f8ca4'
  if (clientID === undefined) {
    throw new Error('Client ID not found')
  }
  return clientID
}

export async function redirectToAuthCodeFlow(): Promise<void> {
  const clientID = getClientID()
  if (clientID === undefined) {
    throw new Error('Client ID not found')
  }
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)
  localStorage.setItem('verifier', verifier)
  const params = new URLSearchParams()
  params.append('client_id', clientID)
  params.append('response_type', 'code')
  params.append('redirect_uri', 'http://localhost:3000/beatsflow')
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

export async function getAccessToken(code: string | null): Promise<string> {
  const clientId = getClientID()
  if (clientId === undefined) {
    throw new Error('Client ID not found')
  }
  if (code === null) {
    throw new Error('Code not found')
  }
  const verifier = localStorage.getItem('verifier')
  if (verifier === null) {
    throw new Error('Code verifier not found')
  }
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('grant_type', 'authorization_code')
  params.append('code', code)
  params.append('redirect_uri', 'http://localhost:5173/callback')
  params.append('code_verifier', verifier)

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  const { accessToken } = await result.json()
  return accessToken
}
