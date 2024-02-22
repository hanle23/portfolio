export default function getClientID(): string {
  const clientID = process.env.SPOTIFY_CLIENT_ID

  if (clientID === undefined) {
    throw new Error('Client ID not found')
  }
  return clientID
}
