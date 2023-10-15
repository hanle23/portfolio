'use client'
import React from 'react'

export default function ContactPage(): React.JSX.Element {
  return (
    <div
      className="justify-items-center flex flex-col text-sky-100  min-h-screen w-fit m-auto"
      id="contact-section"
    >
      <div className="text-center font-extrabold text-3xl md:text-5xl mt-8 mb-5 h-fit">{`Contact Me`}</div>
      <div className="grid">
        <p className="text-center">
          {
            "Hi there! I'm very excited know that you have travelled all the way here to find my contact information! Here are some of the way we can connect (please don't sign me up to magazine subscriptions). I hope you can find a convenient way to reach out to me from the list below!"
          }
        </p>
        <div></div>
      </div>
    </div>
  )
}
