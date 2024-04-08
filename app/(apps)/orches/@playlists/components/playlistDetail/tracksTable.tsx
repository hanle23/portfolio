import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

export default function TracksTable({
  allTrackPages,
  setSize,
  hasNextPage,
  size,
  totalItems,
}: {
  allTrackPages: Playlists[] | undefined
  setSize: (size: number) => Promise<Playlists[] | undefined>
  hasNextPage: boolean
  size: number
  totalItems: number
}): React.JSX.Element {
  const items = allTrackPages?.flatMap((trackPage) => trackPage.items) ?? []
  const isItemLoaded = (index: number): boolean => items[index] !== undefined
  const loadMoreItems = hasNextPage
    ? async () => await setSize(size + 1)
    : async () => {
        await Promise.resolve()
      }
  console.log(totalItems)

  const Item = ({
    index,
    style,
  }: {
    index: number
    style: object
  }): React.JSX.Element => {
    const track = items[index]
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading...</div>
    }
    return (
      <tr style={style} key={track.track.id}>
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
    )
  }

  return (
    <table className="w-full h-full">
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

      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={totalItems}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }: List['props']) => (
          <List
            onItemsRendered={onItemsRendered}
            itemCount={totalItems}
            ref={ref}
            height={500}
            width="100%"
            itemSize={50}
            outerElementType="tbody"
            innerRef={(ref: React.RefObject<any>) => {
              if (ref !== null) {
                ref.current.style.display = 'table-row-group'
              }
            }}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </table>
  )
}
