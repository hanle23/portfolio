import React from 'react'
import Link from 'next/link'
export default function NavBar(): React.JSX.Element {
  const route = ['experience', 'project', 'contact']

  return (
    <div className="flex justify-center space-x-44">
      {route.map((routePath: string) => {
        return (
          <Link href={`/${routePath}`} className="w-1/12" key={routePath}>
            <button className="text-white text-base font-extrabold h-full w-full transition duration-150 bg-transparent p-2.5 hover:scale-110 rounded-lg hover:shadow-md hover:cursor-none hover:bg-white hover:bg-opacity-10">
              <p>{routePath.charAt(0).toUpperCase() + routePath.slice(1)}</p>
            </button>
          </Link>
        )
      })}
    </div>
  )
}
