export default function SavedTracksHeader({
  total,
}: {
  total: number | undefined
}): JSX.Element {
  return (
    <div className="sticky rounded-t-lg top-0 p-3 z-10 bg-[#5038A0]">
      <h1 className="font-extrabold text-4xl">Liked Song</h1>
      {total !== undefined && (
        <p className="flex justify-start text-spotify-subtext gap-1 items-center font-semibold text-md whitespace-nowrap">
          {`${total} songs`}
        </p>
      )}
    </div>
  )
}
