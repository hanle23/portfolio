'use client'
import React from 'react'
import ProjectPage from '@/app/components/pages/projectPage'
import MainPage from '@/app/components/pages/mainPage'
import ExperiencePage from '@/app/components/pages/experiencePage'

export default function Page(): React.JSX.Element {
  return (
    <div className="grid content-center justify-items-center gap-y-10 w-full overflow-hidden pt-20 pb-10 md:pt-40">
      <MainPage />
      <ExperiencePage />
      <ProjectPage />
    </div>
  )
}
