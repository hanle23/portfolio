'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BlockContainer from './specialComponent/NavLink'

export default function NavBar(): React.JSX.Element {
  const pathname = usePathname()
  const [route, setRoute] = useState<string[]>([])
  const [top, setTop] = useState<boolean>(true)
  useEffect(() => {
    const url = `${pathname}`

    const originalRoute: string[] = ['experience', 'projects', 'contact']
    const nextRoute: string[] = originalRoute.map((v, _) => {
      if (v === url.replace('/', '') || v === url.replace('/portfolio/', '')) {
        return 'home'
      } else {
        return v
      }
    })
    setRoute(nextRoute)
  }, [pathname])

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
      className={`flex justify-center space-x-5 sticky top-0 z-50 lg:space-x-44 ${
        !top ? 'bg-[#233831] bg-opacity-70 rounded-full shadow-lg' : ''
      }`}
    >
      {route?.map((routePath: string) => {
        return (
          <BlockContainer key={routePath}>
            <Link
              href={`/${routePath === 'home' ? '' : routePath}`}
              prefetch={true}
              className="text-white p-2.5 hover:cursor-none text-base font-bold relative flex justify-center rounded-lg"
            >
              <p>{routePath.charAt(0).toUpperCase() + routePath.slice(1)}</p>
            </Link>
          </BlockContainer>
        )
      })}
    </div>
  )
}
