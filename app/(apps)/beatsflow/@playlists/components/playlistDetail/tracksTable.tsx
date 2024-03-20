// import { FixedSizeList as List } from 'react-window'
// import InfiniteLoader from 'react-window-infinite-loader'

export default function TracksTable({
  allTrackPages,
  setSize,
}: {
  allTrackPages: Playlists[] | undefined
  setSize: (size: number) => void
}): React.JSX.Element {
  console.log(allTrackPages)
  // const isItemLoaded = (index: number) =>
  //   allTrackPages !== undefined && !!allTrackPages[index]
  // const loadMoreItems = (startIndex: number, stopIndex: number) => {
  //   // Load the next page when the user scrolls to the last loaded item
  //   if (allTrackPages !== undefined && stopIndex === allTrackPages.length - 1) {
  //     setSize((size: number) => size + 1)
  //   }
  // }
  const Row = ({
    index,
    style,
  }: {
    index: number
    style: object
  }): React.JSX.Element => {
    const trackPage = allTrackPages?.[index]
    if (trackPage?.items === undefined) {
      return <div style={style}>Loading...</div>
    }
    return (
      <>
        {trackPage.items.map((track) => (
          <tr style={style} key={track.track.id}>
            <td className="">{track.track.name}</td>
            <td className="hidden md:table-cell">{track.track.album.name}</td>
            <td className="hidden lg:table-cell">
              {new Date(track.added_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </td>
            <td></td>
            <td>
              {Math.floor(track.track.duration_ms / 60000)}:
              {((track.track.duration_ms % 60000) / 1000)
                .toFixed(0)
                .padStart(2, '0')}
            </td>
            <td>options</td>
          </tr>
        ))}
      </>
    )
  }
  return (
    <div>
      <table>
        <thead>
          <tr className="border-b sticky top-0">
            <th className="text-sm py-1 font-normal text-left">Title</th>
            <th className="text-sm py-1 font-normal text-left hidden md:table-cell">
              Album
            </th>
            <th className="text-sm py-1 font-normal text-left hidden lg:table-cell">
              Date added
            </th>
            <th className=""></th>
            <th className="py-1 ">Duration</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {allTrackPages?.map(
            (trackPage, i) =>
              trackPage?.items?.map((track, j) => (
                <tr key={track.track.id}>
                  <td className="">{track.track.name}</td>
                  <td className="text-sm hidden md:table-cell">
                    {track.track.album.name}
                  </td>
                  <td className="text-sm hidden lg:table-cell">
                    {new Date(track.added_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>options</td>
                  <td className="text-center text-sm">
                    {Math.floor(track.track.duration_ms / 60000)}:
                    {((track.track.duration_ms % 60000) / 1000)
                      .toFixed(0)
                      .padStart(2, '0')}
                  </td>
                  <td>options</td>
                </tr>
              )),
          )}
        </tbody>
      </table>
    </div>
  )
}
