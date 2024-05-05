import React from 'react'
export default function Login({
  handlerAuthorization,
}: {
  handlerAuthorization: React.MouseEventHandler<HTMLButtonElement>
}): React.JSX.Element {
  return (
    <div>
      <button
        onClick={handlerAuthorization}
        className="bg-[#1DB954] text-white px-4 py-2 rounded-md"
      >
        Login with Spotify
      </button>
    </div>
  )
}
