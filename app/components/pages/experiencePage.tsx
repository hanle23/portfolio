'use client'
import React, { useState, useCallback } from 'react'
import { experiencesData } from '@/lib/data'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import ResumeLogo from '@/public/js/resumeIcon'
import DialogModal from '@/app/components/dialogModal'
import ExperiencePageContent from './experiencePage/experiencePageContent'

interface Project {
  title: string
  company: string
  location: string
  description: string
  startDate: Date
  endDate: Date
}

export default function ExperiencePage(): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  const experiences = [...experiencesData]
  experiences.sort(function (a: Project, b: Project) {
    return new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
  })

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  const ResumeButton = useCallback(
    () => (
      <div className="sticky h-fit md:-mt-[80px] justify-self-end top-20 md:right-28 hidden md:block">
        <BlockContainer role="button" onClick={handleOpen}>
          <ResumeLogo color="#3a405c" />
        </BlockContainer>
      </div>
    ),
    [handleOpen],
  )

  return (
    <div
      className="justify-items-center grid text-text-light  min-h-screen w-fit m-auto"
      id="experience-section"
    >
      <div className="text-center font-extrabold text-3xl md:text-5xl mt-8 mb-10">
        Experiences
      </div>

      <div className="top-[-100%] grid justify-items-center">
        <ResumeButton />
        {experiences?.map((experience) => (
          <ExperiencePageContent
            key={experience.title}
            experience={experience}
            months={months}
          />
        ))}
        <div className="sticky z-[-1] bottom-[1000px]" />
      </div>

      <DialogModal
        id="iframe"
        open={open}
        onClose={setOpen}
        className="bg-white md:h-5/6 md:w-8/12 text-black"
      >
        <iframe
          title="Resume Preview"
          src="/pdf/resume.pdf#toolbar=0"
          allowFullScreen
          className="w-full h-full"
          sandbox="allow-scripts"
        />
      </DialogModal>
    </div>
  )
}
