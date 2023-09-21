'use client'

import React, { useRef } from 'react'
import NavBar from './navBar'

export const AppWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const cursor = useRef<HTMLDivElement | null>(null)
  const changePosition = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (cursor.current != null) {
      cursor.current.style.top = `${e.clientY}px`
      cursor.current.style.left = `${e.clientX}px`
    }
  }

  return (
    <div
      className="overscroll-none items-center min-w-screen w-full min-h-screen bg-gradient-to-tr to-blue-400 from-green-500 px-7 lg:px-10 py-3"
      onMouseMove={changePosition}
    >
      <NavBar />
      <div
        className="bg-white h-5 w-5 rounded-full fixed pointer-events-none origin-[100%_100%] -translate-x-1/2 -translate-y-1/2"
        ref={cursor}
      />
      {children}
    </div>
  )
}
