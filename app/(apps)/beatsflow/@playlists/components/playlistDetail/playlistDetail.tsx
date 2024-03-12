import React from 'react'
import PlaylistHeader from './playlistHeader'
export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem | null
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  return (
    <div className="w-full h-full">
      <PlaylistHeader playlist={playlist} setCurrPlaylist={setCurrPlaylist} />
    </div>
  )
}
