'use client'
import React from 'react'
import Image from 'next/image'
import GreetingPhrase from './components/greetingPhrase'
import githubLogo from '../public/svg/githubIcon.svg'
import linkedInLogo from '../public/svg/linkedInIcon.svg'
import Link from 'next/link'
import navLink from './components/navLink'
import NavLink from './components/navLink'

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
        <p className="text-base text-sky-100 font-semibold ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="hidden md:block"></div>
        <div className="flex lg:items-end space-x-4">
          <Link href="/contact" className="">
            <button className="justify-center items-center border-sky-100 hover:bg-sky-100 p-2.5 border rounded-lg hover:text-black hover:mix-blend-screen text-xl font-bold text-sky-100 hover:scale-110 transition duration-150">
              Get in touch
            </button>
          </Link>
          <a
            target="_blank"
            href="https://github.com/hanle23"
            rel="noopener noreferrer"
            className="hover:scale-125 transition duration-150"
          >
            <Image src={githubLogo} width={50} alt="GitHub Link" />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/han-le23/"
            rel="noopener noreferrer"
            className="hover:scale-125 transition duration-150"
          >
            <Image src={linkedInLogo} width={50} alt="LinkedIn Link" />
          </a>
        </div>
        <p className="text-base text-sky-100 font-semibold">
          2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <NavLink>Link 1</NavLink>
    </div>
  )
}
