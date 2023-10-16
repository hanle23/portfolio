import React, { useRef, useEffect, useContext, useState } from 'react'
import { Context } from '../appWrapper'
import { gsap } from 'gsap'
export default function Cursor(): React.JSX.Element {
  const cursor = useRef<HTMLDivElement | null>(null)
  const context = useContext(Context)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [inDialog, setInDialog] = useState<boolean>(false)
  const baseStyles =
    context !== null
      ? {
          left: context?.pos.x - 12,
          top: context?.pos.y - 12,
          width: '24px',
          height: '24px',
          background: '#fff',
          opacity: `${
            isVisible && context != null && context.pos.x > 1 ? '1' : '0'
          }`,
          position: 'fixed' as 'fixed',
          borderRadius: '9999px',
          zIndex: inDialog ? 1 : 0,
          pointerEvents: 'none ' as 'none',
        }
      : {}
  useEffect(() => {
    if (context == null || context.selectedElement?.el == null) return
    if (context.status === 'entering' || context.status === 'shifting') {
      if (context.selectedElement.type === 'block') {
        gsap.to(cursor.current, {
          duration: 0,
          ease: 'elastic.out(1, 1)',
          left: context.selectedElement.el.getBoundingClientRect().left,
          top: context.selectedElement.el.getBoundingClientRect().top,
          height: `${
            context.selectedElement.el.getBoundingClientRect().height
          }px`,
          width: `${
            context.selectedElement.el.getBoundingClientRect().width
          }px`,
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
  }, [context?.selectedElement, context?.status])

  useEffect(() => {
    if (context == null || context.selectedElement?.el != null) return
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
      const textSize =
        context.selectedElement?.config?.textSize != null
          ? context.selectedElement?.config?.textSize
          : 1
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

    if (context.selectedElement.type === 'block') {
      baseStyles.left =
        context.selectedElement.el.getBoundingClientRect().left + xMove
      baseStyles.top =
        context.selectedElement.el.getBoundingClientRect().top + yMove
      baseStyles.height = `${
        context.selectedElement.el.getBoundingClientRect().height
      }px`
      baseStyles.width = `${
        context.selectedElement.el.getBoundingClientRect().width
      }px`
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
    document
      .getElementById('builtInModal')
      ?.addEventListener('mouseover', () => {
        setInDialog(true)
      })
    document
      .getElementById('builtInModal')
      ?.addEventListener('mouseleave', () => {
        setInDialog(false)
      })
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
    }
  })

  const shapeClass =
    context?.selectedElement?.el != null &&
    !(context.status === 'entering' || context.status === 'shifting') &&
    context.selectedElement.type != null &&
    !isVisible
  return (
    <div
      style={baseStyles}
      ref={cursor}
      className={`hidden md:inline ${
        !shapeClass && context?.pressing === true ? 'pressing' : ''
      }`}
    />
  )
}
