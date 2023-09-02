'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import RerouteButton from './components/rerouteButton'

export default function Page() {
  const phrases = ["Hi, I'm Han", 'Testing 2']
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    console.log(currentPhrase.length)
    const timerId = setInterval(
      () => setIndex((i) => (i + 1) % phrases.length), // <-- increment index
      currentPhrase.length * 100 + 10000,
    )
    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    setCurrentPhrase(phrases[index]) // <-- update media state when index updates
  }, [index])

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-tr to-blue-400 from-green-500 p-10">
      <div>
        <div className="h-full w-max p-2">
          <h1 className="animate-sliding overflow-hidden whitespace-nowrap border-r-4 border-r-white text-5xl text-white font-bold">
            {currentPhrase}
          </h1>
        </div>
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
