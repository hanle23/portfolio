/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useRef, useEffect } from 'react'
import { transparentize } from 'polished'
import { gsap } from 'gsap'
import CursorContext from './Context'
import { getRelativePosition } from './utils'

const Debug = () => (
  <div className="bg-green w-screen absolute top-0 left-0 flex flex-wrap justify-start p-8">
    <div className="min-w-200">Debug 1</div>
    <div className="min-w-200">Debug 2</div>
    <div className="min-w-200">Debug 3</div>
  </div>
)

const CursorContainer = ({ debug }) => {
  const { pos, selectedElement, status, pressing, setStatus } =
    useContext(CursorContext)

  console.log(useContext(CursorContext))

  const cursorRef = useRef()
  let baseStyles = {
    left: pos.x - 12,
    top: pos.y - 12,
    width: '24px',
    height: '24px',
  }

  useEffect(() => {
    if (!selectedElement.el) return
    if (status === 'entering' || status === 'shifting') {
      if (selectedElement.type === 'block') {
        gsap.to(cursorRef.current, {
          duration: 0.5,
          ease: 'elastic.out(1, 1)',
          left: selectedElement.el.offsetLeft,
          top: selectedElement.el.offsetTop,
          height: `${selectedElement.el.offsetHeight}px`,
          width: `${selectedElement.el.offsetWidth}px`,
          borderRadius: '4px',
          onComplete: () => {
            setStatus('entered')
          },
        })
      }
    } else if (status === 'exiting') {
      gsap.killTweensOf(cursorRef.current)
    }
  }, [selectedElement, status])

  useEffect(() => {
    if (status === 'exiting' && !selectedElement.el) {
      gsap.killTweensOf(cursorRef.current)
      gsap.to(cursorRef.current, {
        duration: 0.5,
        ease: 'elastic.out(1, .5)',
        width: '24px',
        height: '24px',
        x: 0,
        y: 0,
        left: pos.x - 12,
        top: pos.y - 12,
        borderRadius: '12px',
        onComplete: () => {
          setStatus('')
        },
      })
    } else if (
      (status === 'entering' || status === 'shifting') &&
      selectedElement.type === 'text'
    ) {
      const { textSize } = selectedElement.config
      gsap.killTweensOf(cursorRef.current)
      gsap.to(cursorRef.current, {
        duration: 0.5,
        ease: 'elastic.out(1, 1)',
        height: textSize,
        width: '3px',
        x: 12,
        y: textSize / -2 + 10,
        borderRadius: '1px',
        onComplete: () => {
          setStatus('entered')
        },
      })
    }
  }, [pos])

  if (selectedElement.el) {
    const amount = 5
    const relativePos = getRelativePosition(pos, selectedElement.el)
    const xMid = selectedElement.el.clientWidth / 2
    const yMid = selectedElement.el.clientHeight / 2
    const xMove =
      ((relativePos.x - xMid) / selectedElement.el.clientWidth) * amount
    const yMove =
      ((relativePos.y - yMid) / selectedElement.el.clientHeight) * amount

    if (selectedElement.type === 'block') {
      baseStyles = {
        left: selectedElement.el.offsetLeft + xMove,
        top: selectedElement.el.offsetTop + yMove,
        height: `${selectedElement.el.offsetHeight}px`,
        width: `${selectedElement.el.offsetWidth}px`,
      }
    }
  }

  const shapeClass =
    selectedElement.el &&
    !(status === 'entering' || status === 'shifting') &&
    selectedElement.type
  return (
    <div>
      {debug && <Debug />}
      <div
        ref={cursorRef}
        style={baseStyles}
        className={`w-24 h-24 absolute bg-${transparentize(
          0.5,
          'cursor',
        )} rounded-12 ${shapeClass} ${pressing && 'pressing'}`}
      />
    </div>
  )
}

export default CursorContainer
