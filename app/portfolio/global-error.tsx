'use client'
import React from 'react'
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.JSX.Element {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button
          onClick={() => {
            reset()
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
