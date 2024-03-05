'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Skeleton,
} from '@nextui-org/react'
import toast, { Toaster } from 'react-hot-toast'
import QRCode from 'qrcode'
import copy from '@/public/svg/copy.svg'

import { BeatsflowContext } from '../components/appWrapper'
export default function Page(): React.JSX.Element {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const { isOpen, onOpenChange } = useDisclosure()
  const context = useContext(BeatsflowContext)

  const onOpen = async (): Promise<void> => {
    try {
      onOpenChange()
      const url = await QRCode.toDataURL(
        context?.profile?.external_urls?.spotify ?? '',
      )
      setQrCodeUrl(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col content-center items-center justify-items-center gap-y-10 w-full h-auto ">
      <Skeleton isLoaded={context !== null}>
        {context?.profile?.images !== undefined && (
          <Image
            className="h-fit w-fit rounded-full"
            alt="Profile Image"
            width={300}
            height={300}
            priority={true}
            src={
              context?.profile?.images?.find((img) => img.width === 300)?.url
            }
          />
        )}
      </Skeleton>
      <Skeleton isLoaded={context !== null}>
        <button
          className="flex gap-2 text-xl bg-[#282828] text-white py-0.5 px-2.5 rounded-full"
          onClick={() => {
            navigator.clipboard
              .writeText(context?.profile?.external_urls?.spotify ?? '')
              .then(() => {
                toast.success('Link copied to clipboard')
              })
              .catch((error) => {
                console.error(error)
              })
          }}
        >
          {context?.profile?.display_name}
          <Image src={copy} height={15} width={15} alt="copy button" />
        </button>
      </Skeleton>
      <Skeleton isLoaded={context !== null}>
        <p>Followers: {context?.profile?.followers?.total}</p>
      </Skeleton>
      <Skeleton isLoaded={context !== null}>
        <button
          onClick={() => {
            onOpen().catch((error) => {
              console.error(error)
            })
          }}
        >
          Display QR code
        </button>
      </Skeleton>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton={true}
      >
        <ModalContent
          className="bg-[#282828] rounded-lg h-fit w-fit px-0 py-0"
          onClick={onOpenChange}
        >
          <ModalBody>
            <Skeleton isLoaded={qrCodeUrl !== null}>
              <Image
                src={qrCodeUrl ?? ''}
                width={300}
                height={300}
                alt="QR Code"
              />
            </Skeleton>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Toaster />
    </div>
  )
}
