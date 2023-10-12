'use client'
import React, { useContext } from 'react'
import closeLogo from '@/public/svg/close.svg'
import { Context } from '@/app/components/appWrapper'
import Image from 'next/image'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'

interface props {
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}
export default function DialogModal({
  open,
  onClose,
  children,
}: props): React.JSX.Element {
  const context = useContext(Context)
  return (
    <>
      {open && (
        <div
          className=" fixed inset-0 flex h-full w-full justify-center items-center bg-gray-900 bg-opacity-50 z-50"
          onClick={() => {
            onClose(false)
          }}
        >
          <div
            className="bg-white md:h-5/6 md:w-8/12 text-black"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                event.stopPropagation()
              }
            }}
          >
            {children}
          </div>
          <div className="h-5/6 ">
            <BlockContainer className="bg-white opacity-20 rounded-lg h-fit w-fit">
              <button
                onClick={() => {
                  if (context !== null) context.removeSelectedElement()
                  onClose(false)
                }}
              >
                <Image src={closeLogo} width={35} alt="Close Icon" />
              </button>
            </BlockContainer>
          </div>
        </div>
      )}
    </>
  )
}
