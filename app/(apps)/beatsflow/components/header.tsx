'use client'
import React, { useContext, Suspense } from 'react'
import { removeAllServiceItems } from '@/utils/LocalStorage'
import Image from 'next/image'
import {
  Navbar,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react'
import { BeatsflowContext } from './appWrapper'
import leftarrow from '@/public/svg/leftarrow.svg'
export function Header({
  className,
}: {
  className?: string
}): React.JSX.Element {
  const context = useContext(BeatsflowContext)

  const handleLogout = (): void => {
    removeAllServiceItems()
    window.location.reload()
  }
  return context?.profile !== null ? (
    <Navbar className={className ?? 'h-[8%] w-full'} maxWidth="full">
      <NavbarContent justify="start" className="flex w-fit">
        <Link href={'/'} className="flex gap-2 items-center w-fit">
          <Image src={leftarrow} alt="left arrow" width={18} />
          Back to portfolio
        </Link>
      </NavbarContent>
      <NavbarContent justify="center" className="w-fit">
        <Link href={'/beatsflow'} className="text-2xl font-bold">
          Beats Flow
        </Link>
      </NavbarContent>
      <NavbarContent as="div" justify="end" className="w-full ">
        <Dropdown
          placement="bottom-end"
          className="bg-[#282828] text-white text-sm rounded-md"
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform ring-spotify-color"
              name={context?.profile?.display_name}
              size="sm"
              src={
                context?.profile?.images?.find((img) => img.width === 300)?.url
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="profile"
              className="h-fit"
              textValue="Sign in as"
            >
              <Link
                className="flex flex-col gap-1 items-start"
                href={'/beatsflow/profile'}
              >
                <p className="font-semibold">Signed in as</p>
                <Suspense fallback={<div>loading...</div>}>
                  <p className="font-semibold">
                    {context?.profile?.display_name}
                  </p>
                </Suspense>
              </Link>
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-red-600"
              onClick={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  ) : (
    <></>
  )
}
