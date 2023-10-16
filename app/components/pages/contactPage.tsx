'use client'
import React from 'react'
import BlockContainer from '@/app/components/specialComponent/BlockContainer'
import githubLogo from '@/public/svg/githubIcon.svg'
import linkedInLogo from '@/public/svg/linkedInIcon.svg'
import Image from 'next/image'

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="justify-items-center flex flex-col h-full w-full m-auto px-4 py-2">
      <div className="text-center font-extrabold text-3xl md:text-5xl my-10 h-fit">{`Contact Me`}</div>
      <div className="grid auto-rows-max h-full w-full">
        <div className="flex h-fit w-full">
          <p className="text-center">
            {
              "Hi there! I'm very excited know that you have travelled all the way here to find my contact information! Here are some of the way we can connect (please don't sign me up to magazine subscriptions). I hope you can find a convenient way to reach out to me from the list below!"
            }
          </p>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:justify-center md:mt-14  md:space-x-5 items-center h-full m-auto">
          <BlockContainer className="flex p-2.5 border-2 border-zinc-500 h-fit w-fit rounded-md font-bold">
            <a
              target="_blank"
              href="https://calendly.com/hanle23"
              rel="noopener noreferrer"
              className=""
            >
              <p>Schedule a Meeting</p>
            </a>
          </BlockContainer>
          <div className="flex">
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
          </div>
          <div className="flex">
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
    </div>
  )
}
