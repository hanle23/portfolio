'use client'
import React, { useContext, useCallback, useEffect, useRef } from 'react'
import closeLogo from '@/public/svg/close.svg'
import { Context } from '@/app/components/appWrapper'
import Image from 'next/image'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'

interface props {
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  className: string
  id?: string
}
export default function DialogModal({
  open,
  onClose,
  children,
  className,
  id,
}: props): React.JSX.Element {
  const context = useContext(Context)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const handleOnCloseButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()
      if (context !== null) context.removeSelectedElement()
      onClose(!open)
    },
    [context, onClose, open],
  )

  const handleOnCloseDiv = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation()
      if (context !== null) context.removeSelectedElement()
      onClose(!open)
    },
    [context, onClose, open],
  )
  const stopPropagation = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation()
    },
    [],
  )

  const handleKeyPressClose = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        if (context !== null) context.removeSelectedElement()
        onClose(!open)
      }
    },
    [context, onClose, open],
  )

  useEffect(() => {
    if (open && closeButtonRef.current !== null) {
      closeButtonRef.current.focus()
    }
  }, [open])

  return (
    <div
      role="dialog"
      className={`${open ? 'fixed' : 'hidden'} inset-0 flex h-full w-full justify-center items-center bg-gray-900 bg-opacity-50 z-[1]`}
      onClick={handleOnCloseDiv}
      onKeyDown={handleKeyPressClose}
    >
      <div id={id} className={className} onClick={stopPropagation}>
        {children}
      </div>
      <div className="h-5/6">
        <BlockContainer className="flex bg-white opacity-20 rounded-lg h-fit w-fit">
          <button
            onClick={handleOnCloseButton}
            ref={closeButtonRef}
            className="flex h-fit w-fit"
          >
            <Image src={closeLogo} width={35} alt="Close Icon" />
          </button>
        </BlockContainer>
      </div>
    </div>
  )
}
