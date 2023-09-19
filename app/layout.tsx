import type { Metadata } from 'next'
import React from 'react'
// These styles apply to every route in the application
import './globals.css'
import NavBar from './components/navBar'
import Provider from './components/cursor/Provider'

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
        <Provider>
          <div className="overscroll-none items-center w-full min-h-screen bg-gradient-to-tr to-blue-400 from-green-500 px-7 lg:px-10 py-3">
            <NavBar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
