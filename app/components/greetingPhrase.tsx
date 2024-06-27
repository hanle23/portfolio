import React from 'react'
import Typewriter from 'typewriter-effect'
export default function GreetingPhrase(): React.JSX.Element {
  const phrases = [
    "Hi, I'm Han",
    'Chào bạn, mình là Hiếu',
    '안녕하세요 한이에요',
    'Hola, soy Han',
    'Salut, je suis Han',
    'Hallo, ich bin Han',
    'Ciao, sono Han',
    'Olá, sou Han',
    'こんにちは、私はハンです',
    '你好，我是韩',
  ]

  return (
    <div className="h-fit w-fit text-3xl lg:text-7xl font-bold">
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
