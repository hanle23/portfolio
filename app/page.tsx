'use client'
import Link from 'next/link'
import RerouteButton from './components/rerouteButton'
import React from 'react'
import GreetingPhrase from './components/greetingPhrase'

export default function Page(): JSX.Element {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-tr to-blue-400 from-green-500 p-10">
      <div>
        <GreetingPhrase />

        <div className="flex space-x-3">
          <Link href="/about">
            <RerouteButton text={'About'}></RerouteButton>
          </Link>
          <Link href="/portfolio">
            <RerouteButton text={'Portfolio'}></RerouteButton>
          </Link>
          <Link href="/contact">
            <RerouteButton text={'Contact'}></RerouteButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
