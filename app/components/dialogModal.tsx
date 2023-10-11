'use client'
import React from 'react'

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
  return (
    <>
      {open && (
        <div
          className=" fixed inset-0 flex flex-col h-full w-full justify-center items-center bg-gray-900 bg-opacity-50 z-50"
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
        </div>
      )}
    </>
  )
}
