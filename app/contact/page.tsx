'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
export default function Page(): React.JSX.Element {
  const router = useRouter()
  // return (
  //   <div>
  //     <h1>{`Welcome to Contact Page`}</h1>
  //   </div>
  // )

  return (
    <div className="flex flex-col space-y-12 text-sky-100 items-center mt-24">
      <section className="flex flex-col space-y-6 items-center font-bold">
        <h1 className="text-xl">Under Maintenance</h1>
        <p>You can try to refresh the page to see if the issue is resolved.</p>
        <BlockContainer className="h-fit w-fit">
          <button
            type="button"
            className="justify-center items-center border-sky-100 p-2.5 border rounded-lg hover:text-black text-xl font-bold text-sky-100 transition duration-150"
            onClick={() => {
              router.refresh()
            }}
          >
            Refresh
          </button>
        </BlockContainer>
      </section>
    </div>
  )
}
