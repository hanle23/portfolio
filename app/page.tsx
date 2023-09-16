'use client'
import React from 'react'
import GreetingPhrase from './components/greetingPhrase'

export default function Page(): JSX.Element {
  return (
    <div className="grid content-center justify-items-start w-full pl-32 pt-40">
      <GreetingPhrase />
    </div>
  )
}
