'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import toast from 'react-hot-toast'
import QRCode from 'qrcode'
import copy from '@/public/svg/copy.svg'
import type { AuthUser } from '@/app/types/spotify/auth'
import CloseIcon from '@mui/icons-material/Close'
export default function ProfilePage({
  open,
  onClose,
  session,
}: {
  open: boolean
  onClose: (open: boolean) => void
  session: { user: AuthUser }
}): React.JSX.Element {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [openQR, setOpenQR] = useState<boolean>(false)

  const onOpen = async (): Promise<void> => {
    try {
      setOpenQR(true)
      const url = await QRCode.toDataURL(
        session?.user?.external_urls?.spotify ?? '',
      )
      setQrCodeUrl(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {open && (
        <div
          className="absolute z-50 h-screen w-screen"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            e.stopPropagation()
            onClose(!open)
          }}
        >
          <div className="fixed inset-0 z-50 bg-gray-700 bg-opacity-80 transition-opacity"></div>
          <div className="fixed flex justify-center items-center inset-0 z-50 overflow-y-auto">
            <div
              className="relative flex flex-col py-6 px-8 content-center rounded-md items-center justify-center gap-y-10 w-fit h-fit bg-spotify-item-background"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <button
                className="absolute top-1.5 right-1.5"
                onClick={() => {
                  onClose(!open)
                }}
              >
                <CloseIcon className="text-spotify-subtext" />
              </button>
              {session !== null || session !== undefined ? (
                <Image
                  className="h-fit w-fit rounded-full"
                  alt="Profile Image"
                  width={300}
                  height={300}
                  priority
                  src={
                    session?.user?.image?.reduce((prev, current) =>
                      prev.height !== null &&
                      current.height !== null &&
                      prev.height > current.height
                        ? prev
                        : current,
                    ).url ?? ''
                  }
                />
              ) : (
                <Skeleton variant="rounded" width={300} height={300} />
              )}
              {session !== null || session !== undefined ? (
                <button
                  className="flex gap-2 text-xl bg-spotify-item-hover text-spotify-subtext py-0.5 px-2.5 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigator.clipboard
                      .writeText(session?.user?.external_urls?.spotify)
                      .then(() => {
                        toast.success('Link copied to clipboard')
                      })
                      .catch((error) => {
                        console.error(error)
                      })
                  }}
                >
                  {session?.user?.name}
                  <Image src={copy} height={15} width={15} alt="copy button" />
                </button>
              ) : (
                <Skeleton variant="rectangular" height={50} width={100} />
              )}

              <Typography variant="body1">
                {session !== null || session !== undefined ? (
                  `Followers: ${session?.user?.followers?.total}`
                ) : (
                  <Skeleton />
                )}
              </Typography>
              {session !== null || session !== undefined ? (
                <button
                  className="text-spotify-color font-semibold"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpen().catch((error) => {
                      console.error(error)
                    })
                  }}
                >
                  Display QR code
                </button>
              ) : (
                <Skeleton variant="rectangular" height={50} width={100} />
              )}

              <Dialog
                open={openQR}
                onClose={() => {
                  setOpenQR(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  {qrCodeUrl !== '' ? (
                    <Image
                      src={qrCodeUrl}
                      width={300}
                      height={300}
                      alt="QR Code"
                    />
                  ) : (
                    <Skeleton variant="rounded" height={300} width={300} />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
