'use client'
import { signIn } from 'next-auth/react'
import SpotifyLogo from '@/public/png/Spotify_Primary_Logo_RGB_Green.png'
import Image from 'next/image'
export default function Login(): React.JSX.Element {
  return (
    <div className="flex justify-center items-center h-full w-full bg-spotify-item-background">
      <div className="flex flex-col shrink-0 items-center h-fit w-fit px-5 py-5 gap-5 text-center  bg-container rounded-md overflow-hidden">
        <h1 className="font-semibold text-3xl text-white truncate">
          Log in to Orches
        </h1>
        <button
          className="flex w-fit rounded-full border-spotify-subtext border gap-5 px-9 py-3"
          onClick={() => {
            signIn('spotify').catch((error) => {
              console.error(error)
            })
          }}
        >
          <Image
            src={SpotifyLogo}
            alt="Spotify Logo"
            width={30}
            height={30}
            className="shrink-0 max-w-[30px] max-h-[30px]"
          />
          <p className="text-lg font-semibold text-white truncate">
            Continue with Spotify
          </p>
        </button>
        <p className="text-xs text-white">
          Orches is currently under development, if you want to try the
          application out, please contact hanle.cs23@gmail.com with your Spotify
          email for access
        </p>
      </div>
    </div>
  )
}
