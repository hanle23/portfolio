import React, { useContext } from 'react'
import BlockContainer from './specialComponent/BlockContainer'
import { Context } from '@/app/components/appWrapper'
import scrollToSection from '@/app/components/scrollComponents/scrollToSection'

export default function NavBar(): React.JSX.Element {
  const route = ['experience', 'projects', 'contact']
  const context = useContext(Context)

  return (
    <div
      className={`flex justify-center space-x-1 sticky top-0 z-[1] lg:space-x-44 px-2.5 bg-nav-light bg-opacity-60 w-fit rounded-md shadow-lg text-main-light
      `}
    >
      {route?.map((routePath: string) => {
        return (
          <BlockContainer key={routePath}>
            <a
              onClick={() => {
                if (routePath === 'contact') {
                  context?.setContactOpen(!context.contactOpen)
                  return
                }
                scrollToSection(`${routePath}-section`)
              }}
              className="p-2.5 hover:cursor-none text-base font-bold relative flex justify-center rounded-lg"
            >
              <p>{routePath.charAt(0).toUpperCase() + routePath.slice(1)}</p>
            </a>
          </BlockContainer>
        )
      })}
    </div>
  )
}
