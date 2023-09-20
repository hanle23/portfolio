'use client'
import React, { useEffect } from 'react'
import { gsap } from 'gsap'
const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor')
    const links = document.querySelectorAll('a')
    const cursorText = document.querySelector('.cursor-text')

    const onMouseMove = (event) => {
      const { clientX, clientY } = event
      gsap.set(cursor, { x: clientX, y: clientY })
    }

    const onMouseEnterLink = (event) => {
      const link = event.target
      if (link.classList.contains('view')) {
        gsap.to(cursor, { scale: 4 })
        cursorText.computedStyleMap.display = 'block'
      } else {
        gsap.to(cursor, { scale: 4 })
      }
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1 })
      cursorText.style.display = 'none'
    }

    document.addEventListener('mousemove', onMouseMove)
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink)
      link.addEventListener('mouseleave', onMouseLeaveLink)
    })
  })

  return (
    <div
      id="custom-cursor"
      className="fixed bg-[#888] top-0 left-0 w-[20px] h-[20px] rounded-full pointer-events-none z-[9999] p-[10px] flex justify-center items-center"
    >
      <span className="cursor-text"></span>
    </div>
  )
}

export default Cursor
