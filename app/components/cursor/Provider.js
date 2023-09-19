/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client'
import React, { useState } from 'react'
import Cursor from './Cursor'
import Context from './Context'

const Provider = ({ debug, children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const [selectedElement, setSelectedElement] = useState({ el: null })
  const [status, setStatus] = useState('')
  const [pressing, setPressing] = useState(false)
  const [showingCursor, setShowingCursor] = useState(false)

  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePos({ x: pageX, y: pageY })
  }

  const context = {
    pos: mousePos,
    selectedElementSet: (element) => {
      setSelectedElement(element)
      if (!selectedElement.el) {
        setStatus('entering')
      } else {
        setStatus('shifting')
      }
    },
    removeSelectedElement: () => {
      setStatus('exiting')
      setSelectedElement({ el: null })
    },
    setStatus: setStatus,
    status: status,
    selectedElement,
    pressing,
    toggleCursor: () => setShowingCursor(!showingCursor),
    showingCursor: showingCursor,
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      className="relative"
    >
      <style>
        {`
          body, input, textarea, a {
            ${
              !showingCursor &&
              `cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
              url(cursor.png),
              none;`
            }
          }
        `}
      </style>
      <Cursor debug={debug} />
      <Context.Provider value={context}>{children}</Context.Provider>
    </div>
  )
}

export default Provider
