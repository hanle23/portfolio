'use client'
import React, { useContext, useCallback } from 'react'
import Image from 'next/image'
import GreetingPhrase from '@/app/components/greetingPhrase'
import githubLogo from '@/public/svg/githubIcon.svg'
import linkedInLogo from '@/public/svg/linkedInIcon.svg'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import { Context } from '@/app/components/appWrapper'

export default function MainPage(): React.JSX.Element {
  const context = useContext(Context)

  const handleContactClick = useCallback(() => {
    context?.setContactOpen(true)
  }, [context])
  return (
    <div className="h-screen grid content-center w-fit text-text-light">
      <GreetingPhrase />
      <div className="pl-0.5 mt-5">
        <p className="text-lg md:text-4xl font-extrabold ">
          Full Stack Engineer at Tesoract Inc
        </p>
      </div>
      <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-base">
            {`Back in 2016, my journey into programming began with a fascination
            for a Trouble in Terrorist Town server in CS . My friend and I
            started writing mods for his server, and this hobby quickly evolved
            into a passion for software development. Since then, I've had
            numerous opportunities to expand my knowledge across various domains
            within Computer Science, both in academic settings and through
            hands-on experience at a startup.`}
          </p>
          <br />
          <p className="text-base ">
            {`Today, I am actively seeking my next opportunity to build innovative
            products. Currently, I develop SaaS applications at Tesoract and
            create internal software solutions for the School of Continuing
            Studies at York University. In my free time, you'll often find me
            immersed in games like Baldur's Gate 3, reading books, and honing my
            skills on the piano. I also have a keen interest in custom
            mechanical keyboards, music, movies, and audiophile equipment.`}
          </p>
        </div>

        <div className="hidden md:block"></div>

        <div className="flex md:items-end  space-x-4 z-0">
          <BlockContainer className="h-fit">
            <button
              className="justify-center items-center border-text-light p-2.5 border rounded-lg text-xl font-bold transition duration-150"
              onClick={handleContactClick}
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
      </div>
    </div>
  )
}
