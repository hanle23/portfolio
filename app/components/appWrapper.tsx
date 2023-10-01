'use client'

import React, { createContext, useState } from 'react'
import NavBar from './navBar'
import Cursor from './cursor/Cursor'

interface CurrentUserContextType {
  pos: { x: number; y: number }
  status: string
  selectedElement: SelectedElement | null
  setStatus: React.Dispatch<React.SetStateAction<string>>
  pressing: boolean
  selectedElementSet: React.Dispatch<
    React.SetStateAction<SelectedElement | null>
  >
  removeSelectedElement: () => void
}

interface SelectedElement {
  el: (EventTarget & HTMLElement) | null
  type: string | null
  config: { textSize?: number; hoverOffset?: number } | null
}

const initialSelectedElement: SelectedElement = {
  el: null,
  type: null,
  config: null,
}

export const Context = createContext<CurrentUserContextType | null>(null)

export const AppWrapper = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedElement, selectedElementSet] = useState<SelectedElement>(
    initialSelectedElement,
  )
  const [status, setStatus] = useState('')
  const [pressing, setPressing] = useState(false)
  const changePosition = (e: React.MouseEvent<HTMLDivElement>): void => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const context = {
    pos: mousePos,
    selectedElementSet: (element: any) => {
      selectedElementSet(element)
      if (element.el !== null) {
        setStatus('entering')
      } else {
        setStatus('shifting')
      }
    },
    removeSelectedElement: () => {
      setStatus('exiting')
      selectedElementSet({ el: null, type: null, config: null })
    },
    status,
    setStatus,
    selectedElement,
    pressing,
  }

  return (
    <Context.Provider value={context}>
      <div
        className="overscroll-none items-center min-w-screen w-full min-h-screen bg-gradient-to-tr to-blue-400 from-green-500 px-7 lg:px-10 py-3"
        onMouseMove={changePosition}
        onMouseDown={() => {
          setPressing(true)
        }}
        onMouseUp={() => {
          setPressing(false)
        }}
      >
        <Cursor />
        <NavBar />
        {children}
      </div>
    </Context.Provider>
  )
}
