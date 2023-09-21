'use client'

import React, { createContext, useState } from 'react'
import NavBar from './navBar'
import Cursor from './cursor/Cursor'

interface CurrentUserContextType {
  pos: { x: number; y: number }
  isInWindow: boolean
}

export const Context = createContext<CurrentUserContextType | null>(null)

export const AppWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMouseLeave, setMouseLeave] = useState(true)
  const changePosition = (e: React.MouseEvent<HTMLDivElement>): void => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const mouseLeaveWindow = (isLeft: boolean): void => {
    setMouseLeave(true)
  }

  const context = {
    pos: mousePos,
    isInWindow: isMouseLeave,
  }

  return (
    <Context.Provider value={context}>
      <div
        className="overscroll-none items-center min-w-screen w-full min-h-screen bg-gradient-to-tr to-blue-400 from-green-500 px-7 lg:px-10 py-3"
        onMouseMove={changePosition}
        onMouseLeave={() => {
          mouseLeaveWindow(true)
        }}
        onMouseEnter={() => {
          mouseLeaveWindow(false)
        }}
      >
        <Cursor />
        <NavBar />
        {children}
      </div>
    </Context.Provider>
  )
}
