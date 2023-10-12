'use client'
import React, { useEffect, useState } from 'react'
import BlockContainer from './specialComponent/BlockContainer'

export default function NavBar(): React.JSX.Element {
  const route = ['experience', 'projects', 'contact']
  const [top, setTop] = useState<boolean>(true)

  function scrollSmoothTo(elementId: string): void {
    const element = document.getElementById(elementId)
    if (element === null) return
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const scrollHandler = (): void => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [top])

  return (
    <div
      className={`flex justify-center space-x-5 sticky top-0 z-50 lg:space-x-44 px-2.5 ${
        !top ? 'bg-[#233831] bg-opacity-40 w-fit rounded-full shadow-lg ' : ''
      }`}
    >
      {route?.map((routePath: string) => {
        return (
          <BlockContainer key={routePath}>
            <a
              onClick={() => {
                scrollSmoothTo(`${routePath}-section`)
              }}
              className="text-white p-2.5 hover:cursor-none text-base font-bold relative flex justify-center rounded-lg"
            >
              <p>{routePath.charAt(0).toUpperCase() + routePath.slice(1)}</p>
            </a>
          </BlockContainer>
        )
      })}
    </div>
  )
}
