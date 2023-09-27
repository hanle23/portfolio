'use client'
import React from 'react'
import Image from 'next/image'
import GreetingPhrase from './components/greetingPhrase'
import githubLogo from '../public/svg/githubIcon.svg'
import linkedInLogo from '../public/svg/linkedInIcon.svg'
import Link from 'next/link'
import BlockContainer from './components/specialComponent/NavLink'

export default function Page(): JSX.Element {
  return (
    <div className="grid content-center justify-items-start w-full pt-20 lg:pt-40">
      <GreetingPhrase />
      <div className="pl-0.5 mt-5">
        <p className="text-lg lg:text-3xl font-extrabold text-sky-100">
          Full Stack Developer at Tesoract Inc
        </p>
      </div>
      <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-base text-sky-100 font-semibold ">
            Back to 2016 when I was first discovered a Trouble in Terrorist Town
            server in CS:GO, my friend and I was learning to write some mods for
            his server and it pulls me into the hobby of programming. Till now I
            have had many opportunities to widen my knowledge in all kind of
            topics within Computer Science at an education institution and a
            start-up.
          </p>
          <p className="text-base text-sky-100 font-semibold ">
            Nowadays I am seeking for my next opportunities to build great
            product, working with others and continue develop myself to be a
            better engineer, while fooling around with new and cool
            technologies.
          </p>
        </div>

        <div className="hidden md:block"></div>
        <div className="flex lg:items-end space-x-4">
          <BlockContainer>
            <Link href="/contact">
              <button className="justify-center items-center border-sky-100 p-2.5 border rounded-lg hover:text-black hover:mix-blend-screen text-xl font-bold text-sky-100 transition duration-150">
                Get in touch
              </button>
            </Link>
          </BlockContainer>
          <BlockContainer>
            <a
              target="_blank"
              href="https://github.com/hanle23"
              rel="noopener noreferrer"
              className="transition duration-150"
            >
              <Image src={githubLogo} width={50} alt="GitHub Link" />
            </a>
          </BlockContainer>
          <BlockContainer>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/han-le23/"
              rel="noopener noreferrer"
              className="hover:scale-125 transition duration-150"
            >
              <Image src={linkedInLogo} width={50} alt="LinkedIn Link" />
            </a>
          </BlockContainer>
        </div>
        <p className="text-base text-sky-100 font-semibold">
          {
            "During my free time I usually playing games, especially Baldur's Gate 3 these days, reading books and hopefully getting a new piano eventually to be a real Asian."
          }
        </p>
      </div>
    </div>
  )
}
