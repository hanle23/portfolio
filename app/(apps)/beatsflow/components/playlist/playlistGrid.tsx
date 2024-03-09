import PlaylistCard from './playlistCard'

export default function PlaylistGrid({
  playlists,
  className,
}: {
  playlists: PlaylistItem[]
  className: string
}): React.JSX.Element {
  return (
    <div className={className}>
      <div className="grid w-fit h-fit gap-8 md:grid-cols-[repeat(3,minmax(15rem,1fr))] grid-cols-[repeat(1,minmax(15rem,1fr))]">
        {playlists.map((playlist: PlaylistItem) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}
