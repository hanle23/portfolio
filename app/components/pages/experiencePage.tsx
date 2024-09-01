'use client'
import React, { useState, useCallback } from 'react'
import { experiencesData } from '@/lib/data'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import ResumeLogo from '@/public/js/resumeIcon'
import DialogModal from '@/app/components/dialogModal'

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

  function FormatDate({
    className,
    experience,
  }: {
    className: string
    experience: { startDate: Date; endDate: Date }
  }): React.JSX.Element {
    const startDate = `${
      months[experience.startDate.getMonth()]
    } ${experience.startDate.getFullYear()}`
    const endDate =
      experience.endDate.setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0)
        ? 'Present'
        : `${
            months[experience.endDate.getMonth()]
          } ${experience.endDate.getFullYear()}`
    return <div className={className}>{`${startDate} — ${endDate}`}</div>
  }

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])
  return (
    <div
      className="justify-items-center grid text-text-light  min-h-screen w-fit m-auto"
      id="experience-section"
    >
      <div className="text-center font-extrabold text-3xl md:text-5xl mt-8 mb-10">
        Experiences
      </div>

      <div className="top-[-100%] grid justify-items-center">
        <div className="sticky h-fit md:-mt-[80px] justify-self-end top-20 md:right-28 hidden md:block">
          <BlockContainer>
            <button onClick={handleOpen}>
              <ResumeLogo color="#3a405c" />
            </button>
          </BlockContainer>
        </div>
        {experiences?.map((experience) => {
          return (
            <article className="flex w-8/12" key={experience.title}>
              <BlockContainer className="flex h-full w-full p-3 relative">
                <div className=" items-center w-4/12 shrink-0">
                  <FormatDate
                    experience={experience}
                    className="sticky top-10 font-medium"
                  />
                  <div className="sticky -z-[1] bottom-[100px]" />
                </div>
                <div className="grid">
                  <div className="text-2xl font-semibold">
                    {experience.title}
                  </div>
                  <div className="text-xl font-medium">
                    {experience.company}
                  </div>
                  <div>{experience.location}</div>
                  <p>{experience.description}</p>
                </div>
              </BlockContainer>
            </article>
          )
        })}
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
          sandbox=""
        />
      </DialogModal>
    </div>
  )
}
