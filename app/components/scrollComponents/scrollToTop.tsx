'use client'

import React, { useEffect, useState } from 'react'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import Image from 'next/image'
import upArrow from '@/public/svg/chevron-up.svg'

const ScrollToTop = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = (): void => {
      window.scrollY > 50 ? setIsVisible(true) : setIsVisible(false)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = (): void => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      })
  }

  return (
    <div className="flex">
      <BlockContainer>
        <button
          className={`fixed bottom-7 right-5 rounded-md p-2 outline-none
      bg-sky-100 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
          onClick={scrollToTop}
        >
          <Image src={upArrow} className="w-[20px]" alt="Scroll To Top Icon" />
        </button>
      </BlockContainer>
    </div>
  )
}

export default ScrollToTop
