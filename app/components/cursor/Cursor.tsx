import React, { useRef, useEffect, useContext, useState } from 'react'
import { Context } from '../appWrapper'
export default function Cursor(): React.JSX.Element {
  const cursor = useRef<HTMLDivElement | null>(null)
  const context = useContext(Context)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  useEffect(() => {
    if (cursor.current != null && context != null) {
      cursor.current.style.top = `${context.pos.y}px`
      cursor.current.style.left = `${context.pos.x}px`
    }
  }, [context])

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
  return (
    <div
      className={`${
        isVisible && context != null && context.pos.x > 1
          ? 'opacity-100 '
          : 'opacity-0 '
      } bg-white h-[24px] w-[24px] rounded-full fixed pointer-events-none origin-[100%_100%] -translate-x-1/2 -translate-y-1/2`}
      ref={cursor}
    />
  )
}
