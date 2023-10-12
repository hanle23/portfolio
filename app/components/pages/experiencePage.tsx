'use client'
import React, { useState } from 'react'
import { experiencesData } from '@/lib/data'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import Image from 'next/image'
import resumeLogo from '@/public/svg/resumeIcon.svg'
import DialogModal from '@/app/components/dialogModal'

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
  experiences.sort(function (a: any, b: any) {
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
  return (
    <div
      className="justify-items-center grid text-sky-100  min-h-screen w-fit m-auto"
      id="experience-section"
    >
      <div className="text-center font-extrabold text-3xl md:text-5xl mt-8 mb-10 z-[-1]">{`Experiences`}</div>
      <div className="sticky md:-my-[80px] justify-self-end top-20 md:right-28 hidden md:block">
        <BlockContainer>
          <button
            onClick={() => {
              setOpen(!open)
            }}
          >
            <Image src={resumeLogo} width={50} alt="Resume" />
          </button>
        </BlockContainer>
      </div>
      <div className="top-[-100%] grid justify-items-center">
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
      </div>

      <DialogModal open={open} onClose={setOpen}>
        <iframe
          src="/pdf/resume.pdf#toolbar=0"
          allowFullScreen={true}
          className="w-full h-full"
        />
      </DialogModal>
      <div className="sticky -z-[1] bottom-[50px]" />
    </div>
  )
}
