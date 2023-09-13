'use client'
import NavBar from './components/navBar'
import React from 'react'
import GreetingPhrase from './components/greetingPhrase'

export default function Page(): JSX.Element {
  return (
    <div className="overscroll-none items-center w-full h-screen bg-gradient-to-tr to-blue-400 from-green-500 px-10 pt-3">
      <NavBar />
      <div className="grid content-center justify-items-start w-full pl-32 pt-40">
        <GreetingPhrase />
      </div>
    </div>
  )
}
