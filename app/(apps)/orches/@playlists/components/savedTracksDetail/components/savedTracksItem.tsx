import type { SavedTracksObject } from '@/app/types/spotify/savedTracks'
import Image from 'next/image'
export default function SavedTracksItem({
  index,
  track,
}: {
  index: number
  track: SavedTracksObject
}): JSX.Element {
  return (
    <div
      key={track.track.id}
      className="grid grid-cols-12 gap-4 border relative border-solid px-4 border-transparent hover:bg-spotify-item-hover"
    >
      <div className="col-span-1 flex justify-end">{index + 1}</div>

      <div className="col-span-3 md:col-span-6 lg:col-span-6 flex align-middle">
        <Image
          src={track.track.album.images[0].url}
          alt=""
          width={40}
          height={40}
          className="mr-3 shrink-0 bg-image-background"
        />
      </div>

      <div className="hidden md:flex md:col-span-2 lg:col-span-3">Var1</div>

      <div className="hidden lg:flex lg:col-span-1">Var2</div>

      <div className="col-span-1 flex">Last</div>
    </div>
  )
}
