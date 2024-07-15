'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import toast, { Toaster } from 'react-hot-toast'
import QRCode from 'qrcode'
import copy from '@/public/svg/copy.svg'
import sdk from '@/lib/spotify-sdk/ClientInstance'
import type { UserProfile } from '@/app/types/spotify/general'

export default function Page(): React.JSX.Element {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    sdk.currentUser
      .profile()
      .then((profile) => {
        setProfile(profile)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const onOpen = async (): Promise<void> => {
    try {
      setOpen(true)
      const url = await QRCode.toDataURL(profile?.external_urls?.spotify ?? '')
      setQrCodeUrl(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col p-4 content-center items-center justify-items-center gap-y-10 w-full h-auto">
      {profile !== null ? (
        <Image
          className="h-fit w-fit rounded-full"
          alt="Profile Image"
          width={300}
          height={300}
          priority
          src={profile.images.find((img) => img.width === 300)?.url ?? ''}
        />
      ) : (
        <Skeleton variant="rounded" width={300} height={300} />
      )}
      {profile !== null ? (
        <button
          className="flex gap-2 text-xl bg-[#282828] text-white py-0.5 px-2.5 rounded-full"
          onClick={() => {
            navigator.clipboard
              .writeText(profile?.external_urls?.spotify)
              .then(() => {
                toast.success('Link copied to clipboard')
              })
              .catch((error) => {
                console.error(error)
              })
          }}
        >
          {profile?.display_name}
          <Image src={copy} height={15} width={15} alt="copy button" />
        </button>
      ) : (
        <Skeleton variant="rectangular" height={50} width={100} />
      )}

      <Typography variant="body1">
        {profile !== null ? (
          `Followers: ${profile?.followers?.total}`
        ) : (
          <Skeleton />
        )}
      </Typography>
      {profile !== null ? (
        <button
          onClick={() => {
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
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {qrCodeUrl !== '' ? (
            <Image src={qrCodeUrl} width={300} height={300} alt="QR Code" />
          ) : (
            <Skeleton variant="rounded" height={300} width={300} />
          )}
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
