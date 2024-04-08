import React from 'react'
import type { Ref } from 'react'
import InfiniteLoader from 'react-window-infinite-loader'

export default function InfiniteLoaderComponent({
  itemCount,
  loadMoreItems,
  isItemLoaded,
  children,
}: {
  itemCount: number
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>
  isItemLoaded: (index: number) => boolean
  children: ({
    onItemsRendered,
    ref,
  }: {
    onItemsRendered: (props: any) => void
    ref: Ref<any>
  }) => JSX.Element
}): React.JSX.Element {
  return (
    <InfiniteLoader
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      isItemLoaded={isItemLoaded}
    >
      {children}
    </InfiniteLoader>
  )
}
