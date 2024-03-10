import PlaylistCard from './playlistCard'

export default function PlaylistGrid({
  playlists,
  setCurrPlaylist,
}: {
  playlists: PlaylistItem[] | undefined
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistItem | null>>
}): React.JSX.Element {
  return (
    <div className="grid w-fit h-fit gap-8 lg:grid-cols-[repeat(4,minmax(15rem,1fr))] md:grid-cols-[repeat(3,minmax(15rem,1fr))] sm:grid-cols-[repeat(2,minmax(15rem,1fr))] grid-cols-[repeat(1,minmax(15rem,1fr))]">
      {playlists?.map((playlist: PlaylistItem) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
          setCurrPlaylist={setCurrPlaylist}
        />
      ))}
    </div>
  )
}
