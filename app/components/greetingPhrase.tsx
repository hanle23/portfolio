import React from 'react'
import Typewriter from 'typewriter-effect'
export default function GreetingPhrase(): React.JSX.Element {
  const phrases = ["Hi, I'm Han", '안녕하세요 한이에요']

  return (
    <div className="h-fit w-fit p-2 text-white text-5xl font-bold">
      <Typewriter
        options={{
          strings: phrases,
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  )
}
