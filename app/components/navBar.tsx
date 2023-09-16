'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar(): React.JSX.Element {
  const pathname = usePathname()
  const [route, setRoute] = useState<string[]>([])
  useEffect(() => {
    const url = `${pathname}`
    const originalRoute: string[] = ['experience', 'projects', 'contact']
    const nextRoute: string[] = originalRoute.map((v, _) => {
      if (v === url.replace('/', '')) {
        return 'home'
      } else {
        return v
      }
    })
    setRoute(nextRoute)
  }, [pathname])

  return (
    <div className="flex justify-center space-x-44">
      {route?.map((routePath: string) => {
        return (
          <Link
            href={`/${routePath === 'home' ? '' : routePath}`}
            className="w-1/12 hover:cursor-none"
            key={routePath}
          >
            <button className="text-white text-base font-bold h-full w-full transition duration-150 bg-transparent p-2.5 hover:scale-110 rounded-lg hover:shadow-md hover:bg-white hover:bg-opacity-10">
              <p>{routePath.charAt(0).toUpperCase() + routePath.slice(1)}</p>
            </button>
          </Link>
        )
      })}
    </div>
  )
}
