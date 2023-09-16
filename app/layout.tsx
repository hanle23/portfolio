import type { Metadata } from 'next'
import React from 'react'
// These styles apply to every route in the application
import './globals.css'
import NavBar from './components/navBar'

export const metadata: Metadata = {
  title: 'Han Portfolio',
  description: 'Website created by Han',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en">
      {/* <body>{children}</body> */}
      <body>
        <div className="overscroll-none items-center w-full h-screen bg-gradient-to-tr to-blue-400 from-green-500 px-10 pt-3">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  )
}
