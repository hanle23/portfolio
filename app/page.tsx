'use client'
import Link from 'next/link'
import React from 'react'
import GreetingPhrase from './components/greetingPhrase'

export default function Page(): JSX.Element {
  return (
    <div className="lg:flex overscroll-none items-center w-full h-screen bg-gradient-to-tr to-blue-400 from-green-500 p-10">
      <div className="h-full w-1/6">
        <div className="flex h-full sticky overflow-auto lg:space-y-3  lg:flex-col pt-14">
          <Link href="/experience">
            <p>Experience</p>
          </Link>
          <Link href="/portfolio">
            <p>Portfolio</p>
          </Link>
          <Link href="/contact">
            <p>Contact</p>
          </Link>
        </div>
      </div>
      <div className="grid content-center justify-items-start h-full w-full">
        <GreetingPhrase />
      </div>
    </div>
  )
}
