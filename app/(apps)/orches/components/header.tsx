'use client'
import React, { useContext, Suspense, useState } from 'react'
import { removeAllServiceItems } from '@/utils/LocalStorage'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuList from '@mui/material/MenuList'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { OrchesContext } from './appWrapper'
import leftarrow from '@/public/svg/leftarrow.svg'
import Logout from '@mui/icons-material/Logout'

export function Header({
  className,
}: {
  className?: string
}): React.JSX.Element {
  const context = useContext(OrchesContext)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleLogout = (): void => {
    removeAllServiceItems()
    window.location.reload()
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }

  return context?.profile !== null ? (
    <AppBar
      position="absolute"
      color="transparent"
      sx={{
        borderRadius: 3,
        justifyContent: 'center',
        backdropFilter: 'blur(2px)',
        zIndex: '1',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex' }}>
          <Link href={'/'} className="flex items-center w-fit mr-6">
            <Image src={leftarrow} alt="left arrow" width={18} />
          </Link>
          <Link href={'/orches'}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: 'text' }}
            >
              Orches
            </Typography>
          </Link>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={context?.profile?.display_name}
                src={
                  context?.profile?.images?.find((img) => img.width < 300)?.url
                }
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                backgroundColor: '#27272a',
              },
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuList dense sx={{ paddingX: 1, gap: 2, display: 'grid' }}>
              <MenuItem key="profile" className="h-fit">
                <Link
                  className="flex flex-row items-center gap-3"
                  href={'/orches/profile'}
                >
                  <Suspense fallback={<div>loading...</div>}>
                    <Avatar
                      alt={context?.profile?.display_name}
                      src={
                        context?.profile?.images?.find((img) => img.width < 300)
                          ?.url
                      }
                    />
                    <Typography className="font-semibold text-white">
                      {context?.profile?.display_name}
                    </Typography>
                  </Suspense>
                </Link>
              </MenuItem>
              <MenuItem key="logout" onClick={handleLogout}>
                <ListItemIcon sx={{ color: 'rgb(220 38 38)' }}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography sx={{ color: 'rgb(220 38 38)' }}>
                  Log Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <></>
  )
}
