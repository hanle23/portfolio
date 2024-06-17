import type { DetailsPlaylistItem } from '@/app/types/types'
export default function UniqueById(
  items: DetailsPlaylistItem[] | [],
): DetailsPlaylistItem[] | [] {
  const set = new Set()
  return items?.filter((item: DetailsPlaylistItem) => {
    const isDuplicate = set.has(item.id)
    set.add(item.id)
    return !isDuplicate
  })
}
