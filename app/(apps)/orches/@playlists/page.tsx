'use client'

import React, { useContext } from 'react'
import { OrchesContext } from '../components/appWrapper'

import PlaylistDetail from './components/playlistDetail/playlistDetail'

export default function PlaylistPage(): React.JSX.Element {
  const context = useContext(OrchesContext)

  return (
    <div className="w-full h-full relative">
      {context?.currPlaylist !== null && (
        <PlaylistDetail
          playlist={context?.currPlaylist}
          setCurrPlaylist={context?.setCurrPlaylist}

        />
      )}
    </div>
  )
}
