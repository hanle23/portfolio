'use client'

import React, { useContext } from 'react'
import { OrchesContext } from '../components/orchesAppWrapper'
import PlaylistDetail from './components/playlistDetail/playlistDetail'
import SavedTracksDetail from './components/savedTracksDetail/savedTracksDetail'

export default function PlaylistPage(): React.JSX.Element {
  const context = useContext(OrchesContext)

  return (
    <div className="w-full h-full relative">
      {context?.currPlaylist !== undefined && context?.currPlaylist !== null ? (
        <PlaylistDetail
          playlist={context?.currPlaylist}
          setCurrPlaylist={context?.handleSetCurrPlaylist}
        />
      ) : (
        <SavedTracksDetail />
      )}
    </div>
  )
}
