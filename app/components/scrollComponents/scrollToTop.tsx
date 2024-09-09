'use client'

import React, { useEffect, useState, useCallback } from 'react'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import UpArrow from '@/public/js/chevronUp'

const ScrollToTop = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.scrollY > 50) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    if (!isVisible) return
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 100)
  }, [isVisible])

  return (
    <div
      className={`fixed bottom-7 right-5 h-fit w-fit ${
        isVisible ? 'opacity-80' : 'hidden'
      } transition-[display] duration-200`}
    >
      <BlockContainer>
        <button
          className="rounded-md p-2 outline-none
      bg-text-light"
          onClick={scrollToTop}
        >
          <UpArrow color={'#f3edde'} />
        </button>
      </BlockContainer>
    </div>
  )
}

export default ScrollToTop
