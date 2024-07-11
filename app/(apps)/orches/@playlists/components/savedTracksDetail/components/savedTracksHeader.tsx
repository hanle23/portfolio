export default function SavedTracksHeader({
  total,
}: {
  total: number | undefined
}): JSX.Element {
  return (
    <div className="sticky rounded-t-lg top-0 z-10 bg-[#5038A0]">
      <div className="p-3">
        <h1 className="font-extrabold text-4xl">Liked Song</h1>
        {total !== undefined && (
          <p className="flex justify-start text-spotify-subtext gap-1 items-center font-semibold text-md whitespace-nowrap">
            {`${total} songs`}
          </p>
        )}
      </div>
      <div className="bg-spotify-header-background text-spotify-subtext w-full h-8 grid grid-cols-12 gap-4 border-b relative border-spotify-item-background border-solid px-4">
        <div className="col-span-1 flex justify-end items-center">{'#'}</div>
        <div className="col-span-6 lg:col-span-4 flex align-middle items-center">
          <p className="text-sm">Title</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="text-sm">Album</p>
        </div>
        <div className="hidden lg:flex lg:col-span-2 justify-center items-center">
          <p className="text-sm">Date Added</p>
        </div>
        <div className="col-span-2 flex justify-center items-center">var 5</div>
      </div>
    </div>
  )
}
