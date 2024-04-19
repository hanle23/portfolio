import React, { useContext } from 'react'
import BlockContainer from './specialComponent/BlockContainer'
// import ChevronDown from '@/public/js/chevronDown'
import { Context } from '@/app/components/appWrapper'
import { HideOnScroll } from './scrollComponents/hideOnScroll'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import scrollToSection from '@/app/components/scrollComponents/scrollToSection'

export default function NavBar(): React.JSX.Element {
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const appsContent: string[] = []
  const mainNavContent: string[] = ['experience', 'projects', 'contact']
  // const menuContent: string[] = [
  //   ...mainNavContent,
  //   ...(appsContent.length > 0 ? appsContent : []),
  // ]

  const context = useContext(Context)

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
          ))}
        </Toolbar>
      </AppBar>
    </HideOnScroll>

    // <Navbar
    //   isMenuOpen={isMenuOpen}
    //   onMenuOpenChange={setIsMenuOpen}
    //   className="z-[1] rounded-lg sm:w-fit"
    // >
    //   <NavbarContent justify="start">
    //     <NavbarMenuToggle
    //       aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
    //       className="sm:hidden"
    //     />
    //   </NavbarContent>
    //   <NavbarContent
    //     className="hidden sm:flex gap-4  text-text-light w-fit"
    //     justify="center"
    //   >
    //     <NavbarMenuToggle
    //       aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
    //       className="sm:hidden"
    //     />
    //     {mainNavContent?.map((routePath: string) => {
    //       return (
    //         <NavbarItem key={routePath}>
    //           <Button
    //             onClick={() => {
    //               if (routePath === 'contact') {
    //                 context?.setContactOpen(!context.contactOpen)
    //                 return
    //               }
    //               scrollToSection(`${routePath}-section`)
    //             }}
    //             className="p-2.5 hover:cursor-none text-base font-bold relative flex justify-center rounded-lg"
    //           >
    //             <BlockContainer>
    //               {routePath.charAt(0).toUpperCase() + routePath.slice(1)}
    //             </BlockContainer>
    //           </Button>
    //         </NavbarItem>
    //       )
    //     })}
    //   </NavbarContent>
    //   {appsContent.length > 0 && (
    //     <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //       <Dropdown>
    //         <NavbarItem>
    //           <DropdownTrigger>
    //             <Button
    //               className="flex p-2.5 hover:cursor-none text-base font-bold relative justify-center rounded-lg text-text-light"
    //               radius="sm"
    //               variant="light"
    //             >
    //               <BlockContainer className="flex gap-2 justify-center items-center">
    //                 Apps <ChevronDown fill="#3a405c" size={16} />
    //               </BlockContainer>
    //             </Button>
    //           </DropdownTrigger>
    //         </NavbarItem>
    //         <DropdownMenu
    //           aria-label="ACME features"
    //           className="w-60 bg-main-light rounded-lg shadow-lg text-text-light"
    //           itemClasses={{
    //             base: 'gap-4',
    //           }}
    //         >
    //           {appsContent.map((item) => (
    //             <DropdownItem key={item}>
    //               <BlockContainer>
    //                 <Link
    //                   className="w-full text-xl font-bold text-text-light"
    //                   href={`/${item}`}
    //                   size="lg"
    //                 >
    //                   {item.charAt(0).toUpperCase() + item.slice(1)}
    //                 </Link>
    //               </BlockContainer>
    //             </DropdownItem>
    //           ))}
    //         </DropdownMenu>
    //       </Dropdown>
    //     </NavbarContent>
    //   )}

    //   <NavbarMenu>
    //     {menuContent.map((item, index) => {
    //       if (mainNavContent.includes(item)) {
    //         return (
    //           <NavbarMenuItem key={`${item}-${index}`}>
    //             <Link
    //               className="w-full text-xl font-bold text-text-light justify-center"
    //               onClick={() => {
    //                 setIsMenuOpen(false)
    //                 if (item === 'contact') {
    //                   context?.setContactOpen(!context.contactOpen)
    //                   return
    //                 }
    //                 scrollToSection(`${item}-section`)
    //               }}
    //             >
    //               {item.charAt(0).toUpperCase() + item.slice(1)}
    //             </Link>
    //           </NavbarMenuItem>
    //         )
    //       } else {
    //         return (
    //           <NavbarMenuItem key={`${item}-${index}`}>
    //             <Link
    //               className="w-full text-xl font-bold text-text-light justify-center"
    //               href={`/${item}`}
    //             >
    //               {item.charAt(0).toUpperCase() + item.slice(1)}
    //             </Link>
    //           </NavbarMenuItem>
    //         )
    //       }
    //     })}
    //   </NavbarMenu>
    // </Navbar>
  )
}
