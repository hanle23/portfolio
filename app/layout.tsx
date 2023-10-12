import type { Metadata } from 'next'
import React from 'react'
import { AppWrapper } from './components/appWrapper'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

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
    <html lang="en" className="scroll-smooth">
      <body className="bg-gradient-to-tr to-blue-400 from-green-500 bg-no-repeat bg-fixed h-fit w-full">
        <AppWrapper>{children}</AppWrapper>
        <Analytics />
      </body>
    </html>
  )
}
