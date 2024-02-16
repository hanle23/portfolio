'use client'

import React, { createContext, useState, useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import NavBar from './navBar'

import Cursor from './cursor/Cursor'

interface CurrentUserContextType {
  pos: { x: number; y: number }
  status: string
  selectedElement: SelectedElement | null
  setStatus: React.Dispatch<React.SetStateAction<string>>
  pressing: boolean
  contactOpen: boolean
  setContactOpen: React.Dispatch<React.SetStateAction<boolean>>
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
  const [selectedElement, selectedElementSet] =
    useState<SelectedElement | null>(initialSelectedElement)
  const [contactOpen, setContactOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [pressing, setPressing] = useState(false)
  const changePosition = (e: React.MouseEvent<HTMLDivElement>): void => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const context = {
    pos: mousePos,
    selectedElementSet: (
      element: React.SetStateAction<SelectedElement | null>,
    ) => {
      if (typeof element === 'function') {
        selectedElementSet((prevState) => {
          const newElement = element(prevState)
          if (newElement?.el !== null) {
            setStatus('entering')
          } else {
            setStatus('shifting')
          }
          return newElement
        })
      } else {
        selectedElementSet(element)
        if (element?.el !== null) {
          setStatus('entering')
        } else {
          setStatus('shifting')
        }
      }
    },
    removeSelectedElement: () => {
      setStatus('exiting')
      selectedElementSet({ el: null, type: null, config: null })
    },
    contactOpen,
    setContactOpen,
    status,
    setStatus,
    selectedElement,
    pressing,
    setPressing,
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    function disableScroll(): void {
      console.log('Hide scroll')
      document.body.style.overflow = 'hidden'
    }

    function enableScrolling(): void {
      document.body.style.overflow = ''
      // Clear the previous timeout if there is one
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
      // Start a new timeout that will call disableScroll after 1 second of inactivity
      timeoutId = setTimeout(disableScroll, 1000)
    }
    if (window.matchMedia('(min-width: 640px)').matches) {
      document.body.addEventListener('wheel', enableScrolling)
      document.body.addEventListener('click', enableScrolling)
      document.body.addEventListener('mousemove', enableScrolling)
    }

    // Clean up the event listeners and the timeout when the component unmounts
    return () => {
      document.body.removeEventListener('wheel', enableScrolling)
      document.body.removeEventListener('click', enableScrolling)
      document.body.removeEventListener('mousemove', enableScrolling)
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <NextUIProvider>
      <Context.Provider value={context}>
        <div
          className="items-center  flex flex-col min-w-screen w-full min-h-fit overscroll-none px-7 lg:px-10 py-3"
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
    </NextUIProvider>
  )
}
