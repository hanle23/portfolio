import Link from 'next/link'
import React from 'react'
import RerouteButton from './components/rerouteButton'
export default function Page(): JSX.Element {
  return (
    <div>
      <h1>{`Welcome to Han's page`}</h1>
      <Link href="/about">
        <RerouteButton text={'about'}></RerouteButton>
      </Link>
    </div>
  )
}
