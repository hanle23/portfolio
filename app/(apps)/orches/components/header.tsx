'use client'
import React, { useContext, Suspense } from 'react'
import { removeAllServiceItems } from '@/utils/LocalStorage'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { OrchesContext } from './appWrapper'
import leftarrow from '@/public/svg/leftarrow.svg'
import { HideOnScroll } from '@/app/components/scrollComponents/hideOnScroll'

export function Header({
  className,
}: {
  className?: string
}): React.JSX.Element {
  const context = useContext(OrchesContext)

  const handleLogout = (): void => {
    removeAllServiceItems()
    window.location.reload()
  }
  return context?.profile !== null ? (
    // <Navbar
    //   className={className ?? 'h-[8%] w-full overflow-hidden'}
    //   maxWidth="full"
    // >
    //   <NavbarContent justify="start" className="flex w-fit ">
    //     <Link href={'/'} className="flex gap-2 items-center w-fit">
    //       <Image src={leftarrow} alt="left arrow" width={18} />
    //       Back to portfolio
    //     </Link>
    //   </NavbarContent>
    //   <NavbarContent justify="center" className="w-fit">
    //     <Link href={'/orches'} className="text-2xl font-bold">
    //       Beats Flow
    //     </Link>
    //   </NavbarContent>
    //   <NavbarContent as="div" justify="end" className="w-full ">
    //     <Dropdown
    //       placement="bottom-end"
    //       className="bg-[#282828] text-white text-sm rounded-md"
    //     >
    //       <DropdownTrigger>
    //         <Avatar
    //           isBordered
    //           as="button"
    //           className="transition-transform ring-spotify-color"
    //           name={context?.profile?.display_name}
    //           size="sm"
    //           src={
    //             context?.profile?.images?.find((img) => img.width === 300)?.url
    //           }
    //         />
    //       </DropdownTrigger>
    //       <DropdownMenu aria-label="Profile Actions" variant="flat">
    //         <DropdownItem
    //           key="profile"
    //           className="h-fit"
    //           textValue="Sign in as"
    //         >
    //           <Link
    //             className="flex flex-col gap-1 items-start"
    //             href={'/orches/profile'}
    //           >
    //             <p className="font-semibold">Signed in as</p>
    //             <Suspense fallback={<div>loading...</div>}>
    //               <p className="font-semibold">
    //                 {context?.profile?.display_name}
    //               </p>
    //             </Suspense>
    //           </Link>
    //         </DropdownItem>
    //         <DropdownItem
    //           key="logout"
    //           className="text-red-600"
    //           onClick={handleLogout}
    //         >
    //           Log Out
    //         </DropdownItem>
    //       </DropdownMenu>
    //     </Dropdown>
    //   </NavbarContent>
    // </Navbar>
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
          {/* {mainNavContent.map((item) => (
              <BlockContainer
                key={item}
                className="text-text-light font-bold p-2.5"
                onClick={() => {
                  if (item === 'contact') {
                    context?.setContactOpen(!context.contactOpen)
                    return
                  }
                  scrollToSection(`${item}-section`)
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </BlockContainer>
            ))} */}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  ) : (
    <></>
  )
}
