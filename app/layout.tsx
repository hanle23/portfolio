import type { Metadata } from 'next'
import React from 'react'
import { AppWrapper } from './components/appWrapper'
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
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
