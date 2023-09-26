import React, { useRef, useEffect, useContext, useState } from 'react'
import { Context } from '../appWrapper'
import { gsap } from 'gsap'
export default function Cursor(): React.JSX.Element {
  const cursor = useRef<HTMLDivElement | null>(null)
  const context = useContext(Context)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const baseStyles = {
    left: context?.pos.x,
    top: context?.pos.y,
    width: '24px',
    height: '24px',
    background: '#fff',
    opacity: `${isVisible && context != null && context.pos.x > 1 ? '1' : '0'}`,
    position: 'absolute' as 'absolute',
    borderRadius: '15px',
  }

  useEffect(() => {
    if (context == null) return
    if (
      (context.status === 'entering' || context.status === 'shifting') &&
      context.selectedElement?.el != null
    ) {
      if (context.selectedElement.type === 'block') {
        gsap.to(cursor.current, {
          duration: 0.5,
          ease: 'elastic.out(1, 1)',
          left: context.selectedElement.el.offsetLeft,
          top: context.selectedElement.el.offsetTop,
          height: `${context.selectedElement.el.offsetHeight}px`,
          width: `${context.selectedElement.el.offsetWidth}px`,
          borderRadius: '4px',
          onComplete: () => {
            context.setStatus('entered')
          },
        })
      }
    } else if (
      context.status === 'exiting' ||
      context.selectedElement?.el == null
    ) {
      gsap.killTweensOf(cursor.current)
    }
    console.log(context.status)
  }, [context?.selectedElement, context?.status])

  useEffect(() => {
    if (context == null) return
    if (context.status === 'exiting') {
      gsap.killTweensOf(cursor.current)
      gsap.to(cursor.current, {
        duration: 0,
        ease: 'elastic.out(1, .5)',
        width: '24px',
        height: '24px',
        x: 0,
        y: 0,
        left: context.pos.x,
        top: context.pos.y,
        borderRadius: '12px',
        onComplete: () => {
          context.setStatus('')
        },
      })
    } else if (
      (context.status === 'entering' || context.status === 'shifting') &&
      context.selectedElement?.type === 'text' &&
      context.selectedElement?.el != null
    ) {
      const { textSize } = context.selectedElement.config
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
  }, [context?.pos])

  if (context?.selectedElement?.el != null) {
    const amount = 5
    const relativePos = {
      x: context.pos.x - context.selectedElement.el.offsetLeft,
      y: context.pos.y - context.selectedElement.el.offsetTop,
    }
    const xMid = context.selectedElement.el.offsetWidth / 2
    const yMid = context.selectedElement.el.offsetHeight / 2
    const xMove =
      ((relativePos.x - xMid) / context.selectedElement.el.clientWidth) * amount
    const yMove =
      ((relativePos.y - yMid) / context.selectedElement.el.clientHeight) *
      amount

    if (context.selectedElement.type === 'block') {
      baseStyles.left = context.selectedElement.el.offsetLeft + xMove
      baseStyles.top = context.selectedElement.el.offsetTop + yMove
      baseStyles.height = `${context.selectedElement.el.offsetHeight}px`
      baseStyles.width = `${context.selectedElement.el.offsetWidth}px`
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
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  const shapeClass =
    context?.selectedElement?.el != null &&
    !(context.status === 'entering' || context.status === 'shifting') &&
    context.selectedElement.type
  return (
    <div
      style={baseStyles}
      ref={cursor}
      className={
        shapeClass === false && context?.pressing === true ? 'pressing' : ''
      }
    />
  )
}
