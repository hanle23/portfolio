'use client'
import React, { useState } from 'react'
import { experiencesData } from '@/lib/data'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import Image from 'next/image'
import resumeLogo from '@/public/svg/resumeIcon.svg'
import ResumeModal from '@/app/components/pages/resumeModal'
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
  return (
    <div className="justify-items-center grid text-sky-100 relative">
      <h2 className="text-center font-extrabold text-lg md:text-5xl mt-8 mb-10">{`Experiences`}</h2>
      <div className="sticky -m-[80px] justify-self-end top-20 md:right-28">
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
              <BlockContainer className="flex p-3">
                <div className=" items-center w-3/12 shrink-0">
                  <div className="sticky top-10">
                    {`${
                      months[experience.startDate.getMonth()]
                    } ${experience.startDate.getFullYear()} — ${
                      months[experience.endDate.getMonth()]
                    } ${experience.endDate.getFullYear()}`}
                  </div>
                  <div className="sticky -z-[1] bottom-[100px]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{experience.title}</h2>
                  <h3>{experience.location}</h3>
                  <p>{experience.description}</p>
                </div>
              </BlockContainer>
            </article>
          )
        })}
      </div>

      <ResumeModal open={open} onClose={setOpen} />
      <div className="sticky -z-[1] bottom-[100px]" />
    </div>
  )
}
