'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import GreetingPhrase from '@/app/components/greetingPhrase'
import githubLogo from '@/public/svg/githubIcon.svg'
import linkedInLogo from '@/public/svg/linkedInIcon.svg'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import { Context } from '@/app/components/appWrapper'

export default function MainPage(): React.JSX.Element {
  const context = useContext(Context)
  return (
    <div className="h-screen grid content-center w-fit">
      <GreetingPhrase />
      <div className="pl-0.5 mt-5">
        <p className="text-lg md:text-4xl font-extrabold text-sky-100">
          Full Stack Engineer at Tesoract Inc
        </p>
      </div>
      <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-base text-sky-100">
            Back in 2016 when I first discovered a Trouble in Terrorist Town
            server in CS:GO, my friend and I were learning to write some mods
            for his server, and it pulled me into the hobby of programming.
            Since then, I have had many opportunities to broaden my knowledge in
            various topics within Computer Science, both at an{' '}
            <strong>educational institution</strong> and at a{' '}
            <strong>start-up</strong> .
          </p>
          <br />
          <p className="text-base text-sky-100 ">
            Nowadays I am actively seeking for my next opportunity to build
            great products while developing <strong>Saas</strong> application{' '}
            <strong>Tesoract</strong>, and creating internal softwares for{' '}
            <strong>School of Continuing Studies at York University</strong>
          </p>
        </div>

        <div className="hidden md:block"></div>

        <div className="flex md:items-end  space-x-4">
          <BlockContainer className="h-fit">
            <button
              className="justify-center items-center border-sky-100 p-2.5 border rounded-lg hover:text-black text-xl font-bold text-sky-100 transition duration-150"
              onClick={() => {
                context?.setContactOpen(true)
              }}
            >
              Get in touch
            </button>
          </BlockContainer>

          <BlockContainer className="h-fit">
            <a
              target="_blank"
              href="https://github.com/hanle23"
              rel="noopener noreferrer"
              className=""
            >
              <Image src={githubLogo} width={50} alt="GitHub Link" />
            </a>
          </BlockContainer>

          <BlockContainer className="h-fit">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/han-le23/"
              rel="noopener noreferrer"
              className=""
            >
              <Image src={linkedInLogo} width={50} alt="LinkedIn Link" />
            </a>
          </BlockContainer>
        </div>
        <p className="text-base text-sky-100">
          {
            "During my free time I usually playing games, especially Baldur's Gate 3 these days, reading books and hopefully getting a new piano eventually to be a real Asian."
          }
        </p>
      </div>
    </div>
  )
}
