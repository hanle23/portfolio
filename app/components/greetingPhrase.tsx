import React, { useState, useEffect } from 'react'
export default function GreetingPhrase(): React.JSX.Element {
  const phrases = ["Hi, I'm Han", 'Testing 2']
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0])
  useEffect(() => {
    console.log(currentPhrase.length)
    const timerId = setInterval(
      () => {
        setIndex((i) => (i + 1) % phrases.length)
      }, // <-- increment index
      10800,
    )
    return () => {
      clearInterval(timerId)
    }
  }, [])

  const [index, setIndex] = useState(0)
  useEffect(() => {
    setCurrentPhrase(phrases[index]) // <-- update media state when index updates
  }, [index])

  return (
    <div className="h-full w-max p-2">
      <h1 className="animate-sliding overflow-hidden whitespace-nowrap border-r-4 border-r-white text-5xl text-white font-bold">
        {currentPhrase}
      </h1>
    </div>
  )
}
