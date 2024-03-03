'use client'
import React, { useState, useEffect, Suspense } from 'react'
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
import leftarrow from '@/public/svg/leftarrow.svg'
export function Header({
  accessToken,
  setAccessToken,
}: {
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}): React.JSX.Element {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  useEffect(() => {
    fetch('/api/spotify/profile', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(async (response) => await response.json())
      .then((data: UserProfile) => {
        console.log(data)
        setProfile(data)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [accessToken])

  const handleLogout = (): void => {
    setProfile(null)
    removeAllServiceItems()
    setAccessToken('')
    window.location.reload()
  }
  return profile !== null ? (
    <Navbar className="h-fit w-full" maxWidth="full">
      <NavbarContent justify="start" className="flex w-fit">
        <Link href={'/'} className="flex gap-2 items-center w-fit">
          <Image src={leftarrow} alt="left arrow" width={18} />
          Back to main menu
        </Link>
      </NavbarContent>
      <NavbarContent justify="center" className="w-fit">
        <Link href={'/beatsflow'} className="text-xl">
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
              className="transition-transform ring-[#1DB954]"
              name={profile?.display_name}
              size="sm"
              src={profile?.images?.find((img) => img.width === 300)?.url ?? ``}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-fit">
              <Link
                className="flex flex-col gap-1 items-start"
                href={'beatsflow/profile'}
              >
                <p className="font-semibold">Signed in as</p>
                <Suspense fallback={<div>loading...</div>}>
                  <p className="font-semibold">{profile?.display_name}</p>
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
