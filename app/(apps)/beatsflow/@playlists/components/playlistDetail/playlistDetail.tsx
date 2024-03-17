import React from 'react'
import PlaylistHeader from './playlistHeader'
import PlaylistBody from './playlistBody'
export default function PlaylistDetail({
  playlist,
  setCurrPlaylist,
}: {
  playlist: PlaylistItem
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  return (
    <div className="w-full h-full">
      <PlaylistHeader playlist={playlist} setCurrPlaylist={setCurrPlaylist} />
      <PlaylistBody playlist={playlist} />
    </div>
  )
}
