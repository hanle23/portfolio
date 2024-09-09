import React, { useContext, useCallback } from 'react'
import BlockContainer from './specialComponent/BlockContainer'
import { Context } from './appWrapper'
import { HideOnScroll } from '@/app/components/scrollComponents/hideOnScroll'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import scrollToSection from '@/app/components/scrollComponents/scrollToSection'

export default function NavBar(): React.JSX.Element {
  const mainNavContent: string[] = ['experience', 'projects', 'contact']

  const context = useContext(Context)

  const handleScrollToSection = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const value = (e.target as HTMLInputElement).innerText.toLowerCase()
      if (value === 'contact') {
        context?.setContactOpen(!context.contactOpen)
        return
      }
      scrollToSection(`${value}-section`)
    },
    [context],
  )

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          borderRadius: 3,
          justifyContent: 'center',
          width: 'fit-content',
          backdropFilter: 'blur(2px)',
          backgroundColor: '#f3edde',
          zIndex: '1',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          {mainNavContent.map((item) => (
            <BlockContainer
              key={item}
              className="text-text-light font-bold p-2.5"
              onClick={handleScrollToSection}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </BlockContainer>
          ))}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}
