'use client'
import React, { useCallback } from 'react'
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}): React.JSX.Element {
  const handleReset = useCallback(() => {
    reset()
  }, [reset])
  return (
    <html lang="en-US">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={handleReset}>Try again</button>
      </body>
    </html>
  )
}
