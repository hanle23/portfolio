'use client'
import React, { useContext, useCallback } from 'react'
import GreetingPhrase from '@/app/components/greetingPhrase'
import { Context } from '@/app/components/appWrapper'
import SocialButtons from './mainPage/socialButtons'

export default function MainPage(): React.JSX.Element {
  const context = useContext(Context)

  const handleContactClick = useCallback(() => {
    context?.setContactOpen(true)
  }, [context])
  return (
    <div className="h-screen grid content-center space-y-3 w-fit text-text-light">
      <GreetingPhrase />
      <div className="pl-0.5 mt-5">
        <p className="text-lg md:text-4xl font-extrabold ">
          Full Stack Engineer at Tesoract Inc
        </p>
      </div>
      <div className="grid mt-6 grid-cols-1 gap-6">
        <p className="text-base">
          {`Back in 2016, my journey into programming began with a fascination
            for a Trouble in Terrorist Town server in CS . My friend and I
            started writing mods for his server, and this hobby quickly evolved
            into a passion for software development. Since then, I've had
            numerous opportunities to expand my knowledge across various domains
            within Computer Science, both in academic settings and through
            hands-on experience at a startup.`}
        </p>
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
      <SocialButtons handleContactClick={handleContactClick} />
    </div>
  )
}
