export default function getClientID(): string {
  const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID

  if (clientID === undefined) {
    throw new Error('Client ID not found')
  }
  return clientID
}
