'use client'
import React, { useRef, useEffect, useContext, useState } from 'react'
import { Context } from '../appWrapper'
import { gsap } from 'gsap'
export default function Cursor(): React.JSX.Element {
  const cursor = useRef<HTMLDivElement | null>(null)
  const context = useContext(Context)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [, setScrollPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const baseStyles =
    context !== null
      ? {
          left: context?.pos.x - 12,
          top: context?.pos.y - 12,
          width: '24px',
          height: '24px',
          background: '#3a405c',
          opacity: `${isVisible && context.pos.x > 1 ? '1' : '0'}`,
          position: 'fixed' as const,
          borderRadius: '9999px',
          zIndex: 2,
          pointerEvents: 'none ' as 'none',
        }
      : {}
  useEffect(() => {
    if (
      context?.selectedElement?.el === null ||
      context?.selectedElement?.el === undefined
    )
      return
    if (context.status === 'entering' || context.status === 'shifting') {
      if (context.selectedElement.type === 'block') {
        const rect = context.selectedElement.el.getBoundingClientRect()
        gsap.to(cursor.current, {
          duration: 0,
          ease: 'elastic.out(1, 1)',
          left: rect.left,
          top: rect.top,
          height: `${rect.height}px`,
          width: `${rect.width}px`,
          borderRadius: '5px',
          opacity: '0.19',
          onComplete: () => {
            context.setStatus('entered')
          },
        })
      }
    } else if (context.status === 'exiting') {
      gsap.killTweensOf(cursor.current)
    }
  }, [context, context?.selectedElement, context?.status])

  useEffect(() => {
    if (context === null || context.selectedElement?.el !== null) return
    if (context.status === 'exiting') {
      gsap.killTweensOf(cursor.current)
      gsap.to(cursor.current, {
        duration: 0,
        ease: 'elastic.out(1, .5)',
        width: '24px',
        height: '24px',
        x: 0,
        y: 0,
        left: context.pos.x - 12,
        top: context.pos.y - 12,
        borderRadius: '12px',
        onComplete: () => {
          context.setStatus('')
        },
      })
    } else if (
      (context.status === 'entering' || context.status === 'shifting') &&
      context.selectedElement?.type === 'text'
    ) {
      let textSize = context.selectedElement?.config?.textSize
      if (textSize === undefined) {
        textSize = 1
      }
      gsap.killTweensOf(cursor.current)
      gsap.to(cursor.current, {
        duration: 0.5,
        ease: 'elastic.out(1, 1)',
        height: textSize,
        width: '3px',
        x: 12,
        y: textSize / -2 + 10,
        borderRadius: '1px',
        onComplete: () => {
          context.setStatus('entered')
        },
      })
    }
  }, [context, context?.pos])

  if (
    context?.selectedElement?.el !== null &&
    context?.selectedElement?.el !== undefined
  ) {
    const amount = 5
    const relativePos = {
      x:
        context.pos.x - context.selectedElement.el.getBoundingClientRect().left,
      y: context.pos.y - context.selectedElement.el.getBoundingClientRect().top,
    }
    const xMid = context.selectedElement.el.offsetWidth / 2
    const yMid = context.selectedElement.el.offsetHeight / 2
    const xMove =
      ((relativePos.x - xMid) / context.selectedElement.el.clientWidth) * amount
    const yMove =
      ((relativePos.y - yMid) / context.selectedElement.el.clientHeight) *
      amount

    if (context?.selectedElement?.type === 'block') {
      const rect = context.selectedElement.el.getBoundingClientRect()
      baseStyles.left = rect.left + xMove
      baseStyles.top = rect.top + yMove
      baseStyles.height = `${rect.height}px`
      baseStyles.width = `${rect.width}px`
      baseStyles.opacity = '0.2'
    }
  }

  useEffect(() => {
    const handleMouseEnter = (): void => {
      setIsVisible(true)
    }

    const handleMouseLeave = (): void => {
      setIsVisible(false)
    }
    document.getElementById('iframe')?.addEventListener('mouseover', () => {
      setIsVisible(false)
    })
    document.getElementById('iframe')?.addEventListener('mouseleave', () => {
      setIsVisible(true)
    })
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document
        .getElementById('iframe')
        ?.removeEventListener('mouseleave', handleMouseEnter)
      document
        .getElementById('iframe')
        ?.removeEventListener('mouseover', handleMouseLeave)
    }
  })

  const shapeClass =
    context?.selectedElement?.el !== null &&
    !(context?.status === 'entering' || context?.status === 'shifting') &&
    context?.selectedElement?.type !== null &&
    !isVisible
  return (
    <div
      style={baseStyles}
      ref={cursor}
      className={`hidden sm:inline ${
        !shapeClass && context?.pressing === true ? 'pressing' : ''
      }`}
    />
  )
}
