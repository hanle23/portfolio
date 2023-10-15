'use client'
import React from 'react'
import ProjectPage from '@/app/components/pages/projectPage'
import MainPage from '@/app/components/pages/mainPage'
import ExperiencePage from '@/app/components/pages/experiencePage'
import ContactPage from '@/app/components/pages/contactPage'
import ScrollToTop from '@/app/components/scrollComponents/scrollToTop'

export default function Page(): React.JSX.Element {
  return (
    <div className="grid content-center justify-items-center gap-y-10 w-full">
      <MainPage />
      <ExperiencePage />
      <ProjectPage />
      <ContactPage />
      <ScrollToTop />
    </div>
  )
}
