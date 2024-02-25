'use client'
import React, { useContext } from 'react'
import ProjectPage from '@/app/(portfolio)/components/pages/projectPage'
import MainPage from '@/app/(portfolio)/components/pages/mainPage'
import ExperiencePage from '@/app/(portfolio)/components/pages/experiencePage'
import ContactPage from '@/app/(portfolio)/components/pages/contactPage'
import DialogModal from '@/app/(portfolio)/components/dialogModal'
import ScrollToTop from '@/app/(portfolio)/components/scrollComponents/scrollToTop'
import { Context } from '@/app/(portfolio)/components/appWrapper'

export default function Page(): React.JSX.Element {
  const context = useContext(Context)
  return (
    <div className="grid content-center justify-items-center gap-y-10 w-full h-full ">
      <div className="overlay"></div>
      <div>
        <MainPage />
        <ExperiencePage />
        <ProjectPage />
        {context != null && (
          <DialogModal
            id="builtInModal"
            open={context?.contactOpen}
            onClose={context?.setContactOpen}
            className="bg-main-light rounded-lg h-5/6 w-8/12 text-text-light"
          >
            <ContactPage />
          </DialogModal>
        )}
        <ScrollToTop />
      </div>
    </div>
  )
}
