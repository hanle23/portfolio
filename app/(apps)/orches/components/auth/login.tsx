'use client'
import { signIn } from 'next-auth/react'
export default function Login(): React.JSX.Element {
  return (
    <div>
      <h1>Spotify Web API Typescript SDK in Next.js</h1>
      <button
        onClick={() => {
          signIn('spotify').catch((error) => {
            console.error(error)
          })
        }}
      >
        Sign in with Spotify
      </button>
    </div>
  )
}
