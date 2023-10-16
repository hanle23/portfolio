'use client'
import React, { useContext } from 'react'
import ProjectPage from '@/app/components/pages/projectPage'
import MainPage from '@/app/components/pages/mainPage'
import ExperiencePage from '@/app/components/pages/experiencePage'
import ContactPage from '@/app/components/pages/contactPage'
import DialogModal from '@/app/components/dialogModal'
import ScrollToTop from '@/app/components/scrollComponents/scrollToTop'
import { Context } from '@/app/components/appWrapper'

export default function Page(): React.JSX.Element {
  const context = useContext(Context)
  return (
    <div className="grid content-center justify-items-center gap-y-10 w-full">
      <MainPage />
      <ExperiencePage />
      <ProjectPage />
      {context != null && (
        <DialogModal
          id="builtInModal"
          open={context?.contactOpen}
          onClose={context?.setContactOpen}
          className="bg-gradient-to-b to-[#F9957F] from-[#F2F5D0] rounded-lg h-5/6 w-8/12 text-zinc-500"
        >
          <ContactPage />
        </DialogModal>
      )}

      <ScrollToTop />
    </div>
  )
}
