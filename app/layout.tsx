import type { Metadata } from 'next'
import React from 'react'
import AppWrapper from './components/appWrapper'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/globals.css'

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
      <body className="flex h-full w-full bg-main-light">
        <AppWrapper>{children}</AppWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
