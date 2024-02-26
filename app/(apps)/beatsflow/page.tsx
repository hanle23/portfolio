'use client'
import React, { useState } from 'react'

export default function Page(): React.JSX.Element {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  return (
    <div className="flex content-center justify-items-center gap-y-10 w-full h-full ">
      <div>
        <h1>{profile?.display_name}</h1>
      </div>
    </div>
  )
}
