'use client'
import React, { createContext } from 'react'
import { NextUIWrapper } from '@/app/components/nextUIWrapper'

interface BeatsFlowContextType {}

export const BeatsflowContext = createContext<BeatsFlowContextType | null>(null)

// Create the app wrapper component
export const BeatsflowAppWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const context = {}

  return (
    <NextUIWrapper>
      <BeatsflowContext.Provider value={context}>
        {children}
      </BeatsflowContext.Provider>
    </NextUIWrapper>
  )
}

export default BeatsflowAppWrapper
