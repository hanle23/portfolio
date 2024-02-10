import React, { useContext, useState } from 'react'
import BlockContainer from './specialComponent/BlockContainer'
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from '@nextui-org/react'
import { Context } from '@/app/components/appWrapper'
import scrollToSection from '@/app/components/scrollComponents/scrollToSection'

export default function NavBar(): React.JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuContent = ['experience', 'projects', 'contact']
  const mainNavContent = ['experience', 'projects', 'contact']
  const context = useContext(Context)

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="z-[1] rounded-lg sm:w-fit"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex gap-4  text-text-light w-fit"
        justify="center"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        {mainNavContent?.map((routePath: string) => {
          return (
            <NavbarItem key={routePath}>
              <BlockContainer>
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
                  <p>
                    {routePath.charAt(0).toUpperCase() + routePath.slice(1)}
                  </p>
                </a>
              </BlockContainer>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem className="hidden sm:flex text-text-light">
            <DropdownTrigger>
              <BlockContainer>
                <button className="p-2.5 hover:cursor-none text-base font-bold relative flex justify-center rounded-lg">
                  <p>Apps</p>
                </button>
              </BlockContainer>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="apps"
            className="bg-black z-auto"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            {menuContent.map((item, index) => {
              return (
                <DropdownItem key={index}>
                  <Link
                    onClick={() => {
                      scrollToSection(`${item}-section`)
                    }}
                  >
                    {item}
                  </Link>
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuContent.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? 'warning'
                  : index === menuContent.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
